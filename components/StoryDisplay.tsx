import React, { useState, useEffect } from 'react';
import { StoryContent } from '../types';

interface StoryDisplayProps {
  story: StoryContent | null;
  translations: {
    storyTitle: string;
    moralLabel: string;
    listen_en: string;
    stop_en: string;
    listen_pt: string;
    stop_pt: string;
    view_en: string;
    view_pt: string;
    view_split: string;
    copyStory: string;
    copiedStory: string;
    downloadStory: string;
  };
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

const ClipboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
    </svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

const LanguageViewButton: React.FC<{ onClick: () => void; isActive: boolean; children: React.ReactNode }> = ({ onClick, isActive, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${isActive ? 'bg-amber-800 text-white' : 'bg-amber-200 text-amber-800 hover:bg-amber-300'}`}
    >
        {children}
    </button>
);

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, translations }) => {
  const [isSpeakingEn, setIsSpeakingEn] = useState(false);
  const [isSpeakingPt, setIsSpeakingPt] = useState(false);
  const [view, setView] = useState<'split' | 'en' | 'pt'>('split');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [story]);

  useEffect(() => {
    if (!isCopied) return;
    const timer = setTimeout(() => setIsCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [isCopied]);

  if (!story) return null;

  const handleToggleAudio = (lang: 'en' | 'pt') => {
    const isCurrentlySpeaking = lang === 'en' ? isSpeakingEn : isSpeakingPt;

    // Always stop any current speech
    window.speechSynthesis.cancel();
    setIsSpeakingEn(false);
    setIsSpeakingPt(false);

    if (isCurrentlySpeaking) return;

    const textToSpeak = lang === 'en'
      ? `${story.title_en}. ${story.paragraphs_en.join(' ')}`
      : `${story.title_pt}. ${story.paragraphs_pt.join(' ')}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = lang === 'en' ? 'en-GB' : 'pt-BR';

    // For Portuguese, try to find a more natural voice
    if (lang === 'pt') {
        const voices = window.speechSynthesis.getVoices();
        // This is a prioritized search for a higher quality Brazilian Portuguese voice.
        const preferredVoice = voices.find(voice => voice.name === 'Google português do Brasil') ||
                               voices.find(voice => voice.lang === 'pt-BR' && voice.name.includes('Google')) ||
                               voices.find(voice => voice.name === 'Luciana') || // Common on some systems
                               voices.find(voice => voice.lang === 'pt-BR'); // Fallback to the first available pt-BR voice
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }
    }

    const setSpeaking = lang === 'en' ? setIsSpeakingEn : setIsSpeakingPt;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const getFullText = (lang: 'en' | 'pt'): string => {
    if (lang === 'en') {
      return `${story.title_en}\n\n${story.paragraphs_en.join('\n\n')}\n\n${translations.moralLabel}: ${story.moral_en}`;
    }
    return `${story.title_pt}\n\n${story.paragraphs_pt.join('\n\n')}\n\n${translations.moralLabel}: ${story.moral_pt}`;
  };

  const handleCopy = async () => {
    const text = getFullText('pt');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for browsers without the Clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setIsCopied(true);
  };

  const handleDownload = () => {
    const text = getFullText('pt');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${story.title_pt}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const StoryContentComponent: React.FC<{ title: string, paragraphs: string[], moral: string }> = ({ title, paragraphs, moral }) => (
    <div>
        <h3 className="text-3xl md:text-4xl font-bold text-amber-900 text-center mb-6">{title}</h3>
        <div className="bg-amber-100 border-2 border-amber-300 rounded-xl px-5 py-4 mb-8 text-center">
            <p className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-1">⭐ {translations.moralLabel}</p>
            <p className="text-amber-900 font-semibold italic">{moral}</p>
        </div>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            {paragraphs.map((p, index) => <p key={index}>{p}</p>)}
        </div>
    </div>
  );

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-amber-800 text-center mb-8">{translations.storyTitle}</h2>
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 lg:p-12 border-4 border-amber-200">

        <div className="flex justify-center items-center gap-4 mb-6">
            <LanguageViewButton onClick={() => setView('en')} isActive={view === 'en'}>{translations.view_en}</LanguageViewButton>
            <LanguageViewButton onClick={() => setView('pt')} isActive={view === 'pt'}>{translations.view_pt}</LanguageViewButton>
            <LanguageViewButton onClick={() => setView('split')} isActive={view === 'split'}>{translations.view_split}</LanguageViewButton>
        </div>

        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={() => handleToggleAudio('en')}
            className="inline-flex items-center justify-center bg-amber-100 text-amber-800 font-bold px-4 py-2 rounded-full shadow-md hover:bg-amber-200 transition-transform transform hover:scale-105 duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
            disabled={!window.speechSynthesis}
          >
            {isSpeakingEn ? <StopCircleIcon /> : <SpeakerWaveIcon />}
            {isSpeakingEn ? translations.stop_en : translations.listen_en}
          </button>
          <button
            onClick={() => handleToggleAudio('pt')}
            className="inline-flex items-center justify-center bg-amber-100 text-amber-800 font-bold px-4 py-2 rounded-full shadow-md hover:bg-amber-200 transition-transform transform hover:scale-105 duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
            disabled={!window.speechSynthesis}
          >
            {isSpeakingPt ? <StopCircleIcon /> : <SpeakerWaveIcon />}
            {isSpeakingPt ? translations.stop_pt : translations.listen_pt}
          </button>
        </div>

        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center bg-amber-100 text-amber-800 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-amber-200 transition-transform transform hover:scale-105 duration-300"
          >
            <ClipboardIcon />
            {isCopied ? translations.copiedStory : translations.copyStory}
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center bg-amber-100 text-amber-800 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-amber-200 transition-transform transform hover:scale-105 duration-300"
          >
            <DownloadIcon />
            {translations.downloadStory}
          </button>
        </div>

        <div className={`grid gap-10 ${view === 'split' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
            {(view === 'en' || view === 'split') && (
                <StoryContentComponent title={story.title_en} paragraphs={story.paragraphs_en} moral={story.moral_en} />
            )}
            {(view === 'pt' || view === 'split') && (
                <StoryContentComponent title={story.title_pt} paragraphs={story.paragraphs_pt} moral={story.moral_pt} />
            )}
        </div>
      </div>
    </div>
  );
};

export default StoryDisplay;
