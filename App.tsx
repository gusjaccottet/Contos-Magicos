import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PhilosopherSelector from './components/VirtueSelector';
import StoryDisplay from './components/StoryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { generateStory, generateVideo } from './services/geminiService';
import { Philosopher, Story, StoryCustomization } from './types';
import { PHILOSOPHERS } from './constants';

const SectionWrapper: React.FC<{ title: string; description: string; number: number; children: React.ReactNode; }> = ({ title, description, number, children }) => (
    <div className="mb-10">
        <h2 className="text-3xl font-bold text-amber-800 text-center mb-2 flex items-center justify-center">
            <span className="bg-amber-200 text-amber-800 font-bold rounded-full w-10 h-10 inline-flex items-center justify-center mr-4">{number}</span>
            {title}
        </h2>
        <p className="text-center text-amber-700 mb-6">{description}</p>
        <div className="bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-amber-200">
            {children}
        </div>
    </div>
);

const App: React.FC = () => {
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<Philosopher | null>(null);
  const [age, setAge] = useState<string>('');
  const [childName, setChildName] = useState<string>('');
  
  const [debateTopic, setDebateTopic] = useState<string>('');
  const [storyTheme, setStoryTheme] = useState<string>('');

  const [includePrincess, setIncludePrincess] = useState<boolean>(false);
  const [princessName, setPrincessName] = useState<string>('');
  const [includeElf, setIncludeElf] = useState<boolean>(false);
  const [elfName, setElfName] = useState<string>('');
  const [secondaryPhilosopherId, setSecondaryPhilosopherId] = useState<string>('');


  const [story, setStory] = useState<Story | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isDebateMode = debateTopic.trim() !== '';

  useEffect(() => {
    if (isDebateMode) {
      const socrates = PHILOSOPHERS.find(p => p.id === 'socrates');
      if (socrates) {
        setSelectedPhilosopher(socrates);
        setStoryTheme('');
        setSecondaryPhilosopherId('');
      }
    }
  }, [isDebateMode]);


  const handleGenerateStory = useCallback(async () => {
    const childAge = parseInt(age, 10);
    if (!selectedPhilosopher || !age || !childName || isNaN(childAge) || childAge < 2 || childAge > 12) {
      setError('Por favor, preencha o nome da criança, uma idade válida (2-12) e escolha um filósofo.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setStory(null);
    setVideoUrl(null);

    const customization: StoryCustomization = {
      age: childAge,
      childName,
      debateTopic,
      storyTheme,
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
  }, [selectedPhilosopher, age, childName, debateTopic, storyTheme, includePrincess, princessName, includeElf, elfName, secondaryPhilosopherId]);

  const inputClasses = "w-full p-3 text-md border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-500 transition duration-300 disabled:bg-gray-100 disabled:opacity-70";
  const checkboxLabelClasses = "flex items-center space-x-2 text-amber-800 cursor-pointer";

  return (
    <div className="min-h-screen bg-amber-50 text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        
        <SectionWrapper number={1} title="O(A) Protagonista" description="Para quem é esta história mágica?">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="Nome da criança" className={`${inputClasses} text-center`} />
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Idade (2-12)" min="2" max="12" className={`${inputClasses} text-center`} />
            </div>
        </SectionWrapper>

        <SectionWrapper number={2} title="O Guia da Sabedoria" description="Quem irá guiar o herói ou heroína na nossa história?">
            <div className="relative">
              <PhilosopherSelector selectedPhilosopher={selectedPhilosopher} onSelectPhilosopher={setSelectedPhilosopher} />
              {isDebateMode && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl cursor-not-allowed">
                  <p className="text-amber-900 font-bold text-lg text-center p-4 bg-amber-100 rounded-lg border-2 border-amber-200">O Menino Sócrates foi selecionado para guiar o debate.</p>
                </div>
              )}
            </div>
        </SectionWrapper>

        <SectionWrapper number={3} title="A Trama da Aventura" description="Defina o foco central da história.">
            <div>
              <label htmlFor="debate-topic" className="block text-amber-800 font-semibold mb-2 text-lg">Adicionar um Debate Socrático</label>
              <input id="debate-topic" type="text" value={debateTopic} onChange={(e) => setDebateTopic(e.target.value)} placeholder="Ex: O que é a amizade?" className={inputClasses} />
              <p className="text-sm text-amber-600 mt-1">Preencher isto irá focar a história num diálogo com o Menino Sócrates.</p>
            </div>
            <div className="flex items-center my-6">
                <div className="flex-grow border-t border-amber-200"></div>
                <span className="flex-shrink mx-4 text-amber-600 font-semibold">OU</span>
                <div className="flex-grow border-t border-amber-200"></div>
            </div>
            <div>
              <label htmlFor="story-theme" className="block text-amber-800 font-semibold mb-2 text-lg">Escolha um Tema do Dia-a-Dia</label>
              <select id="story-theme" value={storyTheme} onChange={(e) => setStoryTheme(e.target.value)} className={inputClasses} disabled={isDebateMode}>
                <option value="">Nenhum tema específico</option>
                <option value="emprestar um brinquedo">Emprestar um brinquedo</option>
                <option value="partilhar um lanche">Partilhar um lanche</option>
                <option value="ajudar um amigo">Ajudar um amigo</option>
                <option value="esperar pela sua vez">Esperar pela sua vez</option>
                <option value="ser honesto sobre um erro">Ser honesto sobre um erro</option>
              </select>
            </div>
        </SectionWrapper>

        <SectionWrapper number={4} title="Personagens Adicionais" description="Adicione mais amigos à aventura!">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className={checkboxLabelClasses}>
                        <input type="checkbox" checked={includePrincess} onChange={(e) => setIncludePrincess(e.target.checked)} className="h-5 w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"/>
                        <span>Incluir uma Princesa?</span>
                    </label>
                    {includePrincess && <input type="text" value={princessName} onChange={(e) => setPrincessName(e.target.value)} placeholder="Nome da Princesa" className={inputClasses} />}
                </div>
                <div className="space-y-2">
                    <label className={checkboxLabelClasses}>
                        <input type="checkbox" checked={includeElf} onChange={(e) => setIncludeElf(e.target.checked)} className="h-5 w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"/>
                        <span>Incluir um Elfo?</span>
                    </label>
                    {includeElf && <input type="text" value={elfName} onChange={(e) => setElfName(e.target.value)} placeholder="Nome do Elfo" className={inputClasses} />}
                </div>
                <div className="space-y-2">
                    <label className={checkboxLabelClasses}><span>Incluir outro Filósofo?</span></label>
                    <select value={secondaryPhilosopherId} onChange={(e) => setSecondaryPhilosopherId(e.target.value)} className={inputClasses} disabled={isDebateMode}>
                        <option value="">Nenhum</option>
                        {PHILOSOPHERS.filter(p => p.id !== selectedPhilosopher?.id).map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
                    </select>
                </div>
            </div>
        </SectionWrapper>

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
