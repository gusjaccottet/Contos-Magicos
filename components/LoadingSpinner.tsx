import React, { useState, useEffect } from 'react';

const messages = [
    "Os filósofos estão a debater as ideias...",
    "A dar vida à sabedoria com magia...",
    "A animar o seu conto especial...",
    "A renderizar a cena final...",
    "Quase pronto! A animação pode demorar alguns minutos."
];

const LoadingSpinner: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 3000); // Change message every 3 seconds

        return () => clearInterval(intervalId);
    }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-amber-50 rounded-lg shadow-md min-h-[400px]">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600 mb-6"></div>
      <h3 className="text-2xl font-bold text-amber-800 mb-2">A magia está a acontecer...</h3>
      <p className="text-amber-700 transition-opacity duration-500">{messages[messageIndex]}</p>
    </div>
  );
};

export default LoadingSpinner;
