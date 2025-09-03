import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PhilosopherSelector from './components/VirtueSelector';
import StoryDisplay from './components/StoryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { generateStory } from './services/geminiService';
import { Philosopher, StoryContent, StoryCustomization } from './types';
import { translations } from './constants';

type Language = 'en' | 'pt';

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
  const [language, setLanguage] = useState<Language>('en');
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<Philosopher | null>(null);
  const [age, setAge] = useState<string>('');
  const [childName, setChildName] = useState<string>('');
  
  const [story, setStory] = useState<StoryContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[language];

  const handleGenerateStory = useCallback(async () => {
    const childAge = parseInt(age, 10);
    if (!selectedPhilosopher || !age || !childName || isNaN(childAge) || childAge < 2 || childAge > 12) {
      setError(t.errorPrefix);
      return;
    }

    setIsLoading(true);
    setError(null);
    setStory(null);

    const customization: StoryCustomization = {
      age: childAge,
      childName,
    };

    try {
      const generatedStory = await generateStory(selectedPhilosopher, customization);
      setStory(generatedStory);
    } catch (err: any)
    {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedPhilosopher, age, childName, t.errorPrefix]);

  const inputClasses = "w-full p-3 text-md border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-500 transition duration-300";

  return (
    <div className="min-h-screen bg-amber-50 text-gray-800">
      <Header language={language} setLanguage={setLanguage} translations={{ headerTitle: t.headerTitle, headerSubtitle: t.headerSubtitle }} />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        
        <SectionWrapper number={1} title={t.protagonistTitle} description={t.protagonistDescription}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)} placeholder={t.childNamePlaceholder} className={`${inputClasses} text-center`} />
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder={t.agePlaceholder} min="2" max="12" className={`${inputClasses} text-center`} />
            </div>
        </SectionWrapper>

        <SectionWrapper number={2} title={t.guideTitle} description={t.guideDescription}>
            <PhilosopherSelector selectedPhilosopher={selectedPhilosopher} onSelectPhilosopher={setSelectedPhilosopher} language={language} />
        </SectionWrapper>

        <div className="text-center mt-10">
          <button
            onClick={handleGenerateStory}
            disabled={isLoading || !selectedPhilosopher || !age || !childName}
            className="bg-amber-500 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg hover:bg-amber-600 transition-transform transform hover:scale-105 duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isLoading ? t.generatingButton : t.generateButton}
          </button>
        </div>
        {error && <p className="text-center text-red-600 mt-4">{error}</p>}

        <div className="mt-12">
          {isLoading && <LoadingSpinner language={language} />}
          {!isLoading && story && (
            <StoryDisplay 
                story={story} 
                translations={{
                    storyTitle: t.storyTitle,
                    listen_en: t.listen_en,
                    stop_en: t.stop_en,
                    listen_pt: t.listen_pt,
                    stop_pt: t.stop_pt,
                    view_en: t.view_en,
                    view_pt: t.view_pt,
                    view_split: t.view_split,
                }}
            />
          )}
        </div>
      </main>
      <Footer text={t.footer} />
    </div>
  );
};

export default App;