import { GoogleGenAI, GenerateContentResponse, Type, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { Philosopher, StoryContent, StoryCustomization, Theme } from '../types';

// ---------------------------------------------------------------------------
// Provider configuration
// ---------------------------------------------------------------------------
// LLM_PROVIDER: 'auto' (default) | 'gemini' | 'pollinations'
//   auto         -> uses Gemini if GEMINI_API_KEY is set, otherwise Pollinations (free, no key)
//   pollinations -> always uses the free public Pollinations.ai API (no key needed)
//   gemini       -> always uses Gemini (requires GEMINI_API_KEY)
const PROVIDER = (process.env.LLM_PROVIDER || 'auto').toLowerCase();
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const POLLINATIONS_MODEL = process.env.POLLINATIONS_MODEL || 'openai';
const POLLINATIONS_URL = 'https://text.pollinations.ai/openai';

const getApiKey = (): string => process.env.API_KEY || process.env.GEMINI_API_KEY || '';

const resolveProvider = (): 'gemini' | 'pollinations' => {
  if (PROVIDER === 'gemini') return 'gemini';
  if (PROVIDER === 'pollinations') return 'pollinations';
  return getApiKey() ? 'gemini' : 'pollinations'; // auto
};

// ---------------------------------------------------------------------------
// Prompt
// ---------------------------------------------------------------------------
const LENGTH_GUIDE: Record<string, { en: string; pt: string }> = {
  short: { en: 'a short tale: exactly 3 paragraphs', pt: 'um conto curto: exatamente 3 parágrafos' },
  medium: { en: 'a medium tale: about 5 paragraphs', pt: 'um conto médio: cerca de 5 parágrafos' },
  long: { en: 'a long tale: 7 to 8 paragraphs', pt: 'um conto longo: de 7 a 8 parágrafos' },
};

const buildStoryPrompt = (philosopher: Philosopher, theme: Theme, customization: StoryCustomization): string => {
  const { age, childName, companion, length } = customization;
  const lengthGuide = LENGTH_GUIDE[length] || LENGTH_GUIDE.medium;

  return `You are "Contos Mágicos" (Magic Tales), a master storyteller of enchanted children's fairy tales.

Create an ORIGINAL children's story with these exact ingredients:

- Protagonist: ${childName}, a ${age}-year-old child.
  IMPORTANT: Use the name "${childName}" EXACTLY as it is written — do not add, remove or change any character or accent.
- The wise guide: ${philosopher.name_en}, a philosopher whose virtue is "${philosopher.virtue_en}", which for a child means "${philosopher.description_en}". The philosopher appears in the story as a gentle magical mentor (for example, a kindly elder with a staff who speaks in riddles).
- The magic companion: ${companion.name_en} (${companion.emoji}), described as "${companion.description_en}". Give the companion a small magical ability related to that description.
- The lesson: the story teaches "${theme.name_en}" — "${theme.description_en}" — clearly connected to the guide's virtue. End with a warm, natural "moral" that a child can understand.
- The world: a FULLY magical fairy-tale world inspired by J.R.R. Tolkien's universe. Include trees that glow with their own light (like the Two Trees, Laurelin and Telperion), talking animals, floating lanterns, hidden paths and an ancient, benevolent magic. Mix wonder with gentle humor.
- The plot: begin in the child's ordinary world, then a call to adventure; a small challenge that can only be overcome by practicing the lesson; a moment where ONE GOOD DEED LEADS TO ANOTHER (a chain of kindness); and a warm happy ending.
- Length: ${lengthGuide.en}.
- Style: simple, warm and vivid vocabulary adapted to a ${age}-year-old. Short sentences. No scary or dark content. No markdown, no emojis, no bullet points — only plain text paragraphs.
- Creativity: every story must be completely new, never a copy of a known tale.

Generate the story in TWO languages: Brazilian Portuguese (pt_br) and British English (en_gb).
Both versions must feel equally natural and original in their own language — not a literal word-for-word translation.
For EACH language provide: a creative title, the story paragraphs, and a one-sentence moral of the story in child-friendly words.

OUTPUT FORMAT: Respond with ONLY a single valid JSON object (no markdown, no code fences, no comments) with exactly this structure:
{
  "title_en": "...",
  "paragraphs_en": ["...", "...", "..."],
  "moral_en": "...",
  "title_pt": "...",
  "paragraphs_pt": ["...", "...", "..."],
  "moral_pt": "..."
}`;
};

// ---------------------------------------------------------------------------
// Response parsing (works for any provider, tolerant of code fences)
// ---------------------------------------------------------------------------
const extractJson = (text: string): any => {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('No JSON found in the model response.');
  }
  return JSON.parse(cleaned.slice(start, end + 1));
};

const parseStoryResponse = (text: string): StoryContent => {
  const parsed = extractJson(text);

  const isValid = (obj: any): obj is StoryContent =>
    typeof obj?.title_en === 'string' &&
    Array.isArray(obj?.paragraphs_en) && obj.paragraphs_en.length > 0 &&
    typeof obj?.moral_en === 'string' &&
    typeof obj?.title_pt === 'string' &&
    Array.isArray(obj?.paragraphs_pt) && obj.paragraphs_pt.length > 0 &&
    typeof obj?.moral_pt === 'string';

  if (!isValid(parsed)) {
    throw new Error('API response in an unexpected format.');
  }

  return {
    title_en: parsed.title_en,
    paragraphs_en: parsed.paragraphs_en.map((p: string) => p.trim()).filter(Boolean),
    moral_en: parsed.moral_en.trim(),
    title_pt: parsed.title_pt,
    paragraphs_pt: parsed.paragraphs_pt.map((p: string) => p.trim()).filter(Boolean),
    moral_pt: parsed.moral_pt.trim(),
  };
};

// ---------------------------------------------------------------------------
// Providers
// ---------------------------------------------------------------------------
const generateWithGemini = async (prompt: string): Promise<StoryContent> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Gemini provider selected, but no GEMINI_API_KEY found. Set it in .env.local or use LLM_PROVIDER=pollinations.');
  }
  const ai = new GoogleGenAI({ apiKey });

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title_en: { type: Type.STRING, description: "The story title in British English." },
          paragraphs_en: { type: Type.ARRAY, items: { type: Type.STRING }, description: "The story paragraphs in British English." },
          moral_en: { type: Type.STRING, description: "One-sentence moral of the story in British English." },
          title_pt: { type: Type.STRING, description: "The story title in Brazilian Portuguese." },
          paragraphs_pt: { type: Type.ARRAY, items: { type: Type.STRING }, description: "The story paragraphs in Brazilian Portuguese." },
          moral_pt: { type: Type.STRING, description: "One-sentence moral of the story in Brazilian Portuguese." }
        },
        required: ["title_en", "paragraphs_en", "moral_en", "title_pt", "paragraphs_pt", "moral_pt"]
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      ],
      temperature: 0.8,
    }
  });

  return parseStoryResponse(response.text);
};

const generateWithPollinations = async (prompt: string): Promise<StoryContent> => {
  let response: Response;
  try {
    response = await fetch(POLLINATIONS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: POLLINATIONS_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        response_format: { type: 'json_object' },
      }),
    });
  } catch (error) {
    console.error('Pollinations request failed:', error);
    throw new Error('Could not reach the free AI service. Check your internet connection and try again.');
  }

  if (!response.ok) {
    let detail = '';
    try {
      const body = await response.json();
      detail = body?.error?.message || JSON.stringify(body);
    } catch { /* ignore */ }
    console.error('Pollinations error:', response.status, detail);
    throw new Error('The free AI service is busy right now. Please wait a moment and try again.');
  }

  const data = await response.json();
  const content: string = data?.choices?.[0]?.message?.content ?? '';
  if (!content) {
    throw new Error('The free AI service returned an empty response. Please try again.');
  }
  return parseStoryResponse(content);
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------
export const generateStory = async (philosopher: Philosopher, theme: Theme, customization: StoryCustomization): Promise<StoryContent> => {
  const prompt = buildStoryPrompt(philosopher, theme, customization);
  const provider = resolveProvider();
  console.log(`[Contos Mágicos] Generating story with provider: ${provider}`);

  try {
    if (provider === 'gemini') {
      return await generateWithGemini(prompt);
    }
    return await generateWithPollinations(prompt);
  } catch (error: any) {
    console.error("Error generating story:", error);
    // Pass through friendly, user-facing messages from the providers
    if (error?.message && /AI service|GEMINI_API_KEY|Please try again|free AI service/i.test(error.message)) {
      throw error;
    }
    throw new Error("Could not create the story. Please try again.");
  }
};
