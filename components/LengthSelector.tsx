import React from 'react';
import { StoryLength, StoryLengthOption } from '../types';
import { STORY_LENGTHS } from '../constants';

interface LengthSelectorProps {
  selectedLength: StoryLength;
  onSelectLength: (length: StoryLength) => void;
  language: 'en' | 'pt';
}

const LengthCard: React.FC<{ option: StoryLengthOption; isSelected: boolean; onSelect: () => void; language: 'en' | 'pt' }> = ({ option, isSelected, onSelect, language }) => {
  const label = language === 'en' ? option.label_en : option.label_pt;
  const description = language === 'en' ? option.description_en : option.description_pt;

  const selectionClasses = isSelected
    ? 'bg-amber-600 text-white border-amber-700 shadow-lg'
    : 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200';

  return (
    <button
      onClick={onSelect}
      className={`flex flex-col items-center justify-center text-center px-4 py-4 md:py-5 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${selectionClasses} w-full`}
    >
      <h3 className="text-xl font-bold">{label}</h3>
      <p className={`text-sm mt-1 ${isSelected ? 'text-amber-100' : 'text-amber-700'}`}>{description}</p>
    </button>
  );
};

const LengthSelector: React.FC<LengthSelectorProps> = ({ selectedLength, onSelectLength, language }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
      {STORY_LENGTHS.map((option) => (
        <LengthCard
          key={option.id}
          option={option}
          isSelected={selectedLength === option.id}
          onSelect={() => onSelectLength(option.id)}
          language={language}
        />
      ))}
    </div>
  );
};

export default LengthSelector;
