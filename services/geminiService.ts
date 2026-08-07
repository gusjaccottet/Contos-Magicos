import { GoogleGenAI, GenerateContentResponse, Type, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { Philosopher, StoryContent, StoryCustomization, Theme } from '../types';

const storyGenerationModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

const LENGTH_GUIDE: Record<string, { en: string; pt: string }> = {
  short: { en: 'a short tale: exactly 3 paragraphs', pt: 'um conto curto: exatamente 3 parágrafos' },
  medium: { en: 'a medium tale: about 5 paragraphs', pt: 'um conto médio: cerca de 5 parágrafos' },
  long: { en: 'a long tale: 7 to 8 paragraphs', pt: 'um conto longo: de 7 a 8 parágrafos' },
};

const getClient = (): GoogleGenAI => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'The magic wand needs a GEMINI_API_KEY to work. Create a .env.local file with GEMINI_API_KEY=your-key (see README).'
    );
  }
  return new GoogleGenAI({ apiKey });
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
For EACH language provide: a creative title, the story paragraphs, and a one-sentence moral of the story in child-friendly words.`;
};

const parseStoryResponse = (response: GenerateContentResponse): StoryContent => {
  const jsonText = response.text.trim();
  const parsed = JSON.parse(jsonText);

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

export const generateStory = async (philosopher: Philosopher, theme: Theme, customization: StoryCustomization): Promise<StoryContent> => {
  const prompt = buildStoryPrompt(philosopher, theme, customization);

  try {
    const ai = getClient();

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: storyGenerationModel,
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

    return parseStoryResponse(response);

  } catch (error: any) {
    console.error("Error generating story:", error);
    if (error?.message?.includes('GEMINI_API_KEY')) {
      throw error;
    }
    throw new Error("Could not create the story. Please try again.");
  }
};
