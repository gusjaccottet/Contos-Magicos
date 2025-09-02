import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-amber-50 rounded-lg shadow-md min-h-[400px]">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600 mb-6"></div>
      <h3 className="text-2xl font-bold text-amber-800 mb-2">A magia está a acontecer...</h3>
      <p className="text-amber-700">O filósofo está a escrever um conto especial para si!</p>
    </div>
  );
};

export default LoadingSpinner;
