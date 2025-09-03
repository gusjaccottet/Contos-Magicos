import React from 'react';
import { Philosopher } from '../types';
import { PHILOSOPHERS } from '../constants';

interface PhilosopherSelectorProps {
  selectedPhilosopher: Philosopher | null;
  onSelectPhilosopher: (philosopher: Philosopher) => void;
  language: 'en' | 'pt';
}

const PhilosopherCard: React.FC<{ philosopher: Philosopher; isSelected: boolean; onSelect: () => void; language: 'en' | 'pt' }> = ({ philosopher, isSelected, onSelect, language }) => {
  const selectionClasses = isSelected 
    ? `ring-4 ring-offset-2 ${philosopher.color.replace('bg-', 'ring-').replace('100', '400')}` 
    : 'ring-1 ring-gray-200';
    
  const name = language === 'en' ? philosopher.name_en : philosopher.name_pt;
  const virtue = language === 'en' ? philosopher.virtue_en : philosopher.virtue_pt;
  const description = language === 'en' ? philosopher.description_en : philosopher.description_pt;

  return (
    <button
      onClick={onSelect}
      className={`flex flex-col items-center justify-start text-center p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${philosopher.color} ${philosopher.hoverColor} ${selectionClasses} h-full`}
    >
      <div className="mb-3">{philosopher.icon}</div>
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-sm mt-1 text-gray-600 font-semibold">{virtue}</p>
      <p className="text-sm mt-1 flex-grow">{description}</p>
    </button>
  );
};


const PhilosopherSelector: React.FC<PhilosopherSelectorProps> = ({ selectedPhilosopher, onSelectPhilosopher, language }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      {PHILOSOPHERS.map((philosopher) => (
        <PhilosopherCard
          key={philosopher.id}
          philosopher={philosopher}
          isSelected={selectedPhilosopher?.id === philosopher.id}
          onSelect={() => onSelectPhilosopher(philosopher)}
          language={language}
        />
      ))}
    </div>
  );
};

export default PhilosopherSelector;