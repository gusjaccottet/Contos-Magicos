import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Philosopher, Story, StoryCustomization } from '../types';
import { PHILOSOPHERS } from "../constants";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const storyGenerationModel = 'gemini-2.5-flash';
const videoGenerationModel = 'veo-2.0-generate-001';

export const generateStory = async (philosopher: Philosopher, customization: StoryCustomization): Promise<Story> => {
  const { age, childName, storyTheme, debateTopic, includePrincess, princessName, includeElf, elfName, secondaryPhilosopherId } = customization;

  let storyPrompt = '';

  if (debateTopic) {
      storyPrompt = `Crie uma história infantil **muito curta e concisa** (cerca de 3-4 parágrafos) para uma criança de ${age} anos chamada ${childName}.
O personagem principal é ${childName}, que encontra o filósofo Menino Sócrates.
A história deve ser um diálogo socrático sobre o tema: "${debateTopic}".
Sócrates **não deve dar respostas diretas**. Em vez disso, ele deve fazer perguntas simples e orientadoras para ajudar ${childName} a explorar o tema por conta própria e chegar às suas próprias conclusões.
A história deve terminar com ${childName} a ter uma nova perspetiva sobre o tema, graças à conversa com Sócrates.
O tom deve ser curioso, gentil e encorajador.
Adapte a complexidade do diálogo para a idade de ${age} anos.`;
  } else {
      storyPrompt = `Crie uma história infantil **muito curta e concisa** (cerca de 3 parágrafos) para uma criança de ${age} anos chamada ${childName}.
O personagem principal é ${childName}, que é guiado(a) pelo filósofo ${philosopher.name}.
A história deve ser uma aventura simples que ensine uma lição clara sobre a virtude da "${philosopher.virtue}", que para uma criança significa "${philosopher.description}".
**Incorpore elementos subtis inspirados no universo de J.R.R. Tolkien. Mencione árvores que brilham com luz própria, reminiscentes de Laurelin e Telperion, e lições sobre coragem e amizade.**
Adapte a complexidade do vocabulário e da trama para a idade de ${age} anos.
Inclua um momento na história que mostre como uma boa ação leva a outra.`;

      if (storyTheme) {
        storyPrompt += `\nA história deve focar-se no tema de "${storyTheme}", mostrando como a virtude do filósofo se aplica a esta situação.`;
      }
  }

  if (includePrincess && princessName) {
    storyPrompt += ` A história também inclui uma princesa chamada ${princessName}.`;
  }
  if (includeElf && elfName) {
    storyPrompt += ` Um elfo amigável chamado ${elfName} junta-se à aventura.`;
  }
  if (secondaryPhilosopherId && !debateTopic) { // Secondary philosopher is ignored in debate mode
    const secondPhilosopher = PHILOSOPHERS.find(p => p.id === secondaryPhilosopherId);
    if (secondPhilosopher) {
      storyPrompt += ` O filósofo ${secondPhilosopher.name} também aparece para partilhar a sua sabedoria sobre ${secondPhilosopher.virtue}.`;
    }
  }

  storyPrompt += `\n**Gere a história em dois idiomas: Português (pt) e Inglês Britânico (en_gb).**
A história deve ter um título criativo e ser dividida em parágrafos. Não use markdown.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: storyGenerationModel,
      contents: storyPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pt: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "O título em Português." },
                story_paragraphs: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Os parágrafos da história em Português." }
              },
              required: ["title", "story_paragraphs"]
            },
            en_gb: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "The title in British English." },
                story_paragraphs: { type: Type.ARRAY, items: { type: Type.STRING }, description: "The story paragraphs in British English." }
              },
              required: ["title", "story_paragraphs"]
            }
          },
          required: ["pt", "en_gb"]
        },
        temperature: 0.8,
      }
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);
    
    if (!parsedResponse.pt?.title || !parsedResponse.en_gb?.title) {
        throw new Error("Resposta da API em formato inesperado.");
    }

    return {
      pt: {
        title: parsedResponse.pt.title,
        paragraphs: parsedResponse.pt.story_paragraphs,
      },
      en_gb: {
        title: parsedResponse.en_gb.title,
        paragraphs: parsedResponse.en_gb.story_paragraphs,
      },
    };

  } catch (error) {
    console.error("Erro ao gerar a história:", error);
    throw new Error("Não foi possível criar a história. Tente novamente.");
  }
};

export const generateVideo = async (story: Story, customization: StoryCustomization): Promise<string> => {
  const { childName, includePrincess, princessName, includeElf, elfName } = customization;
  const storyText = `${story.pt.title}. ${story.pt.paragraphs.join(' ')}`;
  
  let characterDescriptions = `o filósofo-guia, e a criança ${childName}.`;
  if (includePrincess && princessName) characterDescriptions += ` Inclua também a princesa ${princessName}.`;
  if (includeElf && elfName) characterDescriptions += ` E um elfo chamado ${elfName}.`;


  const videoPrompt = `Crie uma animação curta e mágica no estilo de um filme de animação para crianças, com cores vibrantes e personagens amigáveis. A animação deve ilustrar esta cena: ${storyText}. Os personagens principais são: ${characterDescriptions} **Inclua árvores majestosas que emitem a sua própria luz dourada e prateada, de forma subtil e encantadora.** O estilo deve ser cinematográfico, mas suave e adequado para crianças.`;

  try {
    let operation = await ai.models.generateVideos({
        model: videoGenerationModel,
        prompt: videoPrompt,
        config: {
          numberOfVideos: 1
        }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
      operation = await ai.operations.getVideosOperation({operation: operation});
    }
    
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (downloadLink) {
        // Fetching the video as a blob and creating an object URL is more robust for browsers
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        if (!response.ok) {
            throw new Error(`Falha ao buscar o vídeo: ${response.statusText}`);
        }
        const videoBlob = await response.blob();
        return URL.createObjectURL(videoBlob);
    } else {
        throw new Error("Nenhum vídeo foi gerado ou o link para download não foi encontrado.");
    }

  } catch (error) {
    console.error("Erro ao gerar o vídeo:", error);
    throw new Error("Não foi possível criar a animação. Tente novamente.");
  }
};