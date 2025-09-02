import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import VirtueSelector from './components/VirtueSelector';
import StoryDisplay from './components/StoryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { generateStory, generateIllustration } from './services/geminiService';
import { Virtue, Story } from './types';

const App: React.FC = () => {
  const [selectedVirtue, setSelectedVirtue] = useState<Virtue | null>(null);
  const [characterName, setCharacterName] = useState<string>('');
  const [story, setStory] = useState<Story | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateStory = useCallback(async () => {
    if (!selectedVirtue || !characterName.trim()) {
      setError('Por favor, escolha uma virtude e digite o nome de um personagem.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setStory(null);
    setImageUrl(null);

    try {
      const generatedStory = await generateStory(selectedVirtue, characterName.trim());
      setStory(generatedStory);
      const generatedImageUrl = await generateIllustration(generatedStory);
      setImageUrl(generatedImageUrl);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedVirtue, characterName]);

  return (
    <div className="min-h-screen bg-amber-50 text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white/70 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-lg border border-amber-200">
          <VirtueSelector selectedVirtue={selectedVirtue} onSelectVirtue={setSelectedVirtue} />

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-amber-800 text-center mb-2">2. Crie um Personagem</h2>
            <p className="text-center text-amber-700 mb-6">Qual é o nome do herói ou heroína da nossa história?</p>
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="Ex: Leo, a Coruja Curiosa"
              className="w-full max-w-lg mx-auto block p-4 text-lg border-2 border-amber-300 rounded-full focus:ring-4 focus:ring-amber-300 focus:border-amber-500 transition duration-300"
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleGenerateStory}
              disabled={isLoading || !selectedVirtue || !characterName}
              className="bg-amber-500 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg hover:bg-amber-600 transition-transform transform hover:scale-105 duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLoading ? 'Criando Magia...' : 'Gerar História!'}
            </button>
          </div>
          {error && <p className="text-center text-red-600 mt-4">{error}</p>}
        </div>

        <div className="mt-12">
          {isLoading && <LoadingSpinner />}
          {!isLoading && story && <StoryDisplay story={story} imageUrl={imageUrl} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
