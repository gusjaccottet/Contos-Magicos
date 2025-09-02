import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Virtue, Story } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const storyGenerationModel = 'gemini-2.5-flash';
const imageGenerationModel = 'imagen-4.0-generate-001';

export const generateStory = async (virtue: Virtue, characterName: string): Promise<Story> => {
  const prompt = `Crie uma história infantil curta e encantadora para uma criança de 5 a 8 anos. O personagem principal é chamado ${characterName}. A história deve ser uma aventura simples que ensine uma lição clara sobre a virtude da "${virtue.name}", que significa "${virtue.description}". A história deve ter um título criativo e ser dividida em parágrafos. Não use markdown.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: storyGenerationModel,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "O título da história."
            },
            story_paragraphs: {
              type: Type.ARRAY,
              description: "Os parágrafos da história.",
              items: {
                type: Type.STRING
              }
            }
          }
        },
        temperature: 0.8,
      }
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);
    
    if (!parsedResponse.title || !Array.isArray(parsedResponse.story_paragraphs)) {
        throw new Error("Resposta da API em formato inesperado.");
    }

    return {
      title: parsedResponse.title,
      paragraphs: parsedResponse.story_paragraphs,
    };

  } catch (error) {
    console.error("Erro ao gerar a história:", error);
    throw new Error("Não foi possível criar a história. Tente novamente.");
  }
};

export const generateIllustration = async (story: Story): Promise<string> => {
  const storyText = `${story.title}. ${story.paragraphs.join(' ')}`;
  const imagePrompt = `Crie uma ilustração vibrante e mágica no estilo de um livro de histórias infantil, baseada nesta cena: ${storyText}. O estilo deve ser suave, colorido e amigável.`;

  try {
    const response = await ai.models.generateImages({
        model: imageGenerationModel,
        prompt: imagePrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '1:1',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error("Nenhuma imagem foi gerada.");
    }

  } catch (error) {
    console.error("Erro ao gerar a ilustração:", error);
    throw new Error("Não foi possível criar a ilustração. Tente novamente.");
  }
};
