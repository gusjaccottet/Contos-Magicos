import React from 'react';
import { Philosopher } from '../types';
import { PHILOSOPHERS } from '../constants';

interface PhilosopherSelectorProps {
  selectedPhilosopher: Philosopher | null;
  onSelectPhilosopher: (philosopher: Philosopher) => void;
}

const PhilosopherCard: React.FC<{ philosopher: Philosopher; isSelected: boolean; onSelect: () => void }> = ({ philosopher, isSelected, onSelect }) => {
  const selectionClasses = isSelected 
    ? `ring-4 ring-offset-2 ${philosopher.color.replace('bg-', 'ring-').replace('100', '400')}` 
    : 'ring-1 ring-gray-200';

  return (
    <button
      onClick={onSelect}
      className={`flex flex-col items-center justify-start text-center p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${philosopher.color} ${philosopher.hoverColor} ${selectionClasses} h-full`}
    >
      <div className="mb-3">{philosopher.icon}</div>
      <h3 className="text-xl font-bold">{philosopher.name}</h3>
      <p className="text-sm mt-1 text-gray-600 font-semibold">{philosopher.virtue}</p>
      <p className="text-sm mt-1 flex-grow">{philosopher.description}</p>
    </button>
  );
};


const PhilosopherSelector: React.FC<PhilosopherSelectorProps> = ({ selectedPhilosopher, onSelectPhilosopher }) => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-amber-800 text-center mb-2">1. Escolha um Filósofo Guia</h2>
      <p className="text-center text-amber-700 mb-6">Quem irá guiar o herói ou heroína na nossa história?</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {PHILOSOPHERS.map((philosopher) => (
          <PhilosopherCard
            key={philosopher.id}
            philosopher={philosopher}
            isSelected={selectedPhilosopher?.id === philosopher.id}
            onSelect={() => onSelectPhilosopher(philosopher)}
          />
        ))}
      </div>
    </div>
  );
};

export default PhilosopherSelector;
