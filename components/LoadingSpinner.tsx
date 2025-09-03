import React, { useState, useEffect } from 'react';

const messages = {
    en: [
        "The philosophers are gathering their thoughts...",
        "Weaving wisdom into a tale...",
        "Polishing the paragraphs...",
        "Almost ready! Your story is on its way."
    ],
    pt: [
        "Os filósofos estão reunindo seus pensamentos...",
        "Tecendo sabedoria em um conto...",
        "Polindo os parágrafos...",
        "Quase pronto! Sua história está a caminho."
    ]
};

interface LoadingSpinnerProps {
    language: 'en' | 'pt';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ language }) => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages[language].length);
        }, 3000); // Change message every 3 seconds

        return () => clearInterval(intervalId);
    }, [language]);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-amber-50 rounded-lg shadow-md min-h-[400px]">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600 mb-6"></div>
      <h3 className="text-2xl font-bold text-amber-800 mb-2">
        {language === 'en' ? 'Magic is happening...' : 'A magia está acontecendo...'}
      </h3>
      <p className="text-amber-700 transition-opacity duration-500">{messages[language][messageIndex]}</p>
    </div>
  );
};

export default LoadingSpinner;