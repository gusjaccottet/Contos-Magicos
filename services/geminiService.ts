import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Philosopher, StoryContent, StoryCustomization } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const storyGenerationModel = 'gemini-2.5-flash';

export const generateStory = async (philosopher: Philosopher, customization: StoryCustomization): Promise<StoryContent> => {
  const { age, childName } = customization;

  const storyPrompt = `Create a very short and concise children's story (about 3 paragraphs) for a ${age}-year-old named ${childName}.
The main character is ${childName}, who is guided by the philosopher ${philosopher.name_en}.
The story should be a simple adventure that teaches a clear lesson about the virtue of "${philosopher.virtue_en}", which for a child means "${philosopher.description_en}".
Incorporate subtle elements inspired by J.R.R. Tolkien's universe. Mention trees that glow with their own light, reminiscent of Laurelin and Telperion, and lessons about courage and friendship.
Adapt the complexity of the vocabulary and plot for a ${age}-year-old.
Include a moment in the story that shows how one good deed leads to another.
The story must have a creative title and be divided into paragraphs. Do not use markdown.
IMPORTANT: Generate the story in two languages: British English (en_gb) and Brazilian Portuguese (pt_br). Provide both versions in the response.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: storyGenerationModel,
      contents: storyPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title_en: { type: Type.STRING, description: "The title in British English." },
            paragraphs_en: { type: Type.ARRAY, items: { type: Type.STRING }, description: "The story paragraphs in British English." },
            title_pt: { type: Type.STRING, description: "The title in Brazilian Portuguese." },
            paragraphs_pt: { type: Type.ARRAY, items: { type: Type.STRING }, description: "The story paragraphs in Brazilian Portuguese." }
          },
          required: ["title_en", "paragraphs_en", "title_pt", "paragraphs_pt"]
        },
        temperature: 0.8,
      }
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);
    
    if (!parsedResponse.title_en || !parsedResponse.paragraphs_en || !parsedResponse.title_pt || !parsedResponse.paragraphs_pt) {
        throw new Error("API response in an unexpected format.");
    }

    return {
      title_en: parsedResponse.title_en,
      paragraphs_en: parsedResponse.paragraphs_en,
      title_pt: parsedResponse.title_pt,
      paragraphs_pt: parsedResponse.paragraphs_pt,
    };

  } catch (error) {
    console.error("Error generating story:", error);
    throw new Error("Could not create the story. Please try again.");
  }
};