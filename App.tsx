import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PhilosopherSelector from './components/VirtueSelector';
import StoryDisplay from './components/StoryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { generateStory, generateVideo } from './services/geminiService';
import { Philosopher, Story, StoryCustomization } from './types';
import { PHILOSOPHERS } from './constants';

const App: React.FC = () => {
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<Philosopher | null>(null);
  const [age, setAge] = useState<string>('');
  const [childName, setChildName] = useState<string>('');
  
  const [includePrincess, setIncludePrincess] = useState<boolean>(false);
  const [princessName, setPrincessName] = useState<string>('');
  const [includeElf, setIncludeElf] = useState<boolean>(false);
  const [elfName, setElfName] = useState<string>('');
  const [secondaryPhilosopherId, setSecondaryPhilosopherId] = useState<string>('');

  const [story, setStory] = useState<Story | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateStory = useCallback(async () => {
    const childAge = parseInt(age, 10);
    if (!selectedPhilosopher || !age || !childName || isNaN(childAge) || childAge < 2 || childAge > 12) {
      setError('Por favor, escolha um filósofo, preencha o nome da criança e insira uma idade válida entre 2 e 12 anos.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setStory(null);
    setVideoUrl(null);

    const customization: StoryCustomization = {
      age: childAge,
      childName,
      includePrincess,
      princessName,
      includeElf,
      elfName,
      secondaryPhilosopherId
    };

    try {
      const generatedStory = await generateStory(selectedPhilosopher, customization);
      setStory(generatedStory);
      
      const generatedVideoUrl = await generateVideo(generatedStory, customization);
      setVideoUrl(generatedVideoUrl);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedPhilosopher, age, childName, includePrincess, princessName, includeElf, elfName, secondaryPhilosopherId]);

  const inputClasses = "w-full p-3 text-md border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-500 transition duration-300";
  const checkboxLabelClasses = "flex items-center space-x-2 text-amber-800 cursor-pointer";

  return (
    <div className="min-h-screen bg-amber-50 text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white/70 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-lg border border-amber-200">
          <PhilosopherSelector selectedPhilosopher={selectedPhilosopher} onSelectPhilosopher={setSelectedPhilosopher} />

          <div className="my-8">
            <h2 className="text-3xl font-bold text-amber-800 text-center mb-2">2. Sobre a Criança</h2>
            <p className="text-center text-amber-700 mb-6">Isto ajuda o filósofo a adaptar a sua sabedoria.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Nome da criança"
                className={`${inputClasses} text-center`}
              />
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Idade (2-12)"
                min="2"
                max="12"
                className={`${inputClasses} text-center`}
              />
            </div>
          </div>
          
          <div className="my-8">
            <h2 className="text-3xl font-bold text-amber-800 text-center mb-2">3. Personalize a História</h2>
            <p className="text-center text-amber-700 mb-6">Adicione mais personagens à aventura!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {/* Princesa */}
                <div className="space-y-2">
                    <label className={checkboxLabelClasses}>
                        <input type="checkbox" checked={includePrincess} onChange={(e) => setIncludePrincess(e.target.checked)} className="h-5 w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"/>
                        <span>Incluir uma Princesa?</span>
                    </label>
                    {includePrincess && (
                        <input type="text" value={princessName} onChange={(e) => setPrincessName(e.target.value)} placeholder="Nome da Princesa" className={inputClasses} />
                    )}
                </div>
                {/* Elfo */}
                <div className="space-y-2">
                    <label className={checkboxLabelClasses}>
                        <input type="checkbox" checked={includeElf} onChange={(e) => setIncludeElf(e.target.checked)} className="h-5 w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"/>
                        <span>Incluir um Elfo?</span>
                    </label>
                    {includeElf && (
                        <input type="text" value={elfName} onChange={(e) => setElfName(e.target.value)} placeholder="Nome do Elfo" className={inputClasses} />
                    )}
                </div>
                {/* Outro Filósofo */}
                <div className="space-y-2">
                    <label className={checkboxLabelClasses}>
                        <span>Incluir outro Filósofo?</span>
                    </label>
                    <select value={secondaryPhilosopherId} onChange={(e) => setSecondaryPhilosopherId(e.target.value)} className={inputClasses}>
                        <option value="">Nenhum</option>
                        {PHILOSOPHERS.filter(p => p.id !== selectedPhilosopher?.id).map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
            </div>
          </div>


          <div className="text-center mt-10">
            <button
              onClick={handleGenerateStory}
              disabled={isLoading || !selectedPhilosopher || !age || !childName}
              className="bg-amber-500 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg hover:bg-amber-600 transition-transform transform hover:scale-105 duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLoading ? 'Criando Magia...' : 'Gerar História Animada!'}
            </button>
          </div>
          {error && <p className="text-center text-red-600 mt-4">{error}</p>}
        </div>

        <div className="mt-12">
          {isLoading && <LoadingSpinner />}
          {!isLoading && story && <StoryDisplay story={story} videoUrl={videoUrl} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
