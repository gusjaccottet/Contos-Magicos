import React, { useState, useEffect } from 'react';
import { Story } from '../types';

interface StoryDisplayProps {
  story: Story | null;
  videoUrl: string | null;
}

const SpeakerWaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>
);

const StopCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.254 9.254 9 9.563 9h4.874c.309 0 .563.254.563.563v4.874c0 .309-.254.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" />
    </svg>
);


const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, videoUrl }) => {
  const [activeLang, setActiveLang] = useState<'pt' | 'en_gb'>('pt');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Cleanup speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!story) {
    return null;
  }
  
  const handleToggleAudio = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const currentContent = story[activeLang];
    const textToSpeak = `${currentContent.title}. ${currentContent.paragraphs.join(' ')}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    utterance.lang = activeLang === 'pt' ? 'pt-BR' : 'en-GB';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };
  
  const currentStory = story[activeLang];

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-amber-800 text-center mb-8">O Seu Conto Mágico Animado</h2>
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 lg:p-12 border-4 border-amber-200">
        <div className="max-w-3xl mx-auto">
          {videoUrl && (
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg border-2 border-amber-100 aspect-video">
              <video 
                src={videoUrl} 
                className="w-full h-full object-cover" 
                controls 
                autoPlay 
                loop
                muted // Autoplay with sound is often blocked by browsers
              />
            </div>
          )}

          <div className="text-center mb-6">
            <button
                onClick={handleToggleAudio}
                className="inline-flex items-center justify-center bg-amber-100 text-amber-800 font-bold px-6 py-3 rounded-full shadow-md hover:bg-amber-200 transition-transform transform hover:scale-105 duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
                disabled={!window.speechSynthesis}
            >
                {isSpeaking ? <StopCircleIcon /> : <SpeakerWaveIcon />}
                {isSpeaking ? 'Parar Narração' : 'Ouvir História'}
            </button>
          </div>

          <div className="flex justify-center border-b-2 border-amber-200 mb-6">
            <button 
                onClick={() => setActiveLang('pt')} 
                className={`px-6 py-2 text-lg font-semibold rounded-t-lg transition-colors duration-300 ${activeLang === 'pt' ? 'bg-amber-200 text-amber-900' : 'text-gray-500 hover:bg-amber-50'}`}
            >
                Português
            </button>
            <button 
                onClick={() => setActiveLang('en_gb')} 
                className={`px-6 py-2 text-lg font-semibold rounded-t-lg transition-colors duration-300 ${activeLang === 'en_gb' ? 'bg-amber-200 text-amber-900' : 'text-gray-500 hover:bg-amber-50'}`}
            >
                English (UK)
            </button>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-amber-900 text-center mb-6">{currentStory.title}</h3>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            {currentStory.paragraphs.map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDisplay;