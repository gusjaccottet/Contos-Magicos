import React from 'react';
import { MagicCompanion } from '../types';
import { COMPANIONS } from '../constants';

interface CompanionSelectorProps {
  selectedCompanion: MagicCompanion | null;
  onSelectCompanion: (companion: MagicCompanion) => void;
  language: 'en' | 'pt';
}

const CompanionCard: React.FC<{ companion: MagicCompanion; isSelected: boolean; onSelect: () => void; language: 'en' | 'pt' }> = ({ companion, isSelected, onSelect, language }) => {
  const selectionClasses = isSelected
    ? `ring-4 ring-offset-2 ${companion.color.replace('bg-', 'ring-').replace('100', '400')}`
    : 'ring-1 ring-gray-200';

  const name = language === 'en' ? companion.name_en : companion.name_pt;
  const description = language === 'en' ? companion.description_en : companion.description_pt;

  return (
    <button
      onClick={onSelect}
      className={`flex flex-col items-center justify-start text-center p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${companion.color} ${companion.hoverColor} ${selectionClasses} h-full`}
    >
      <div className="mb-3 text-5xl leading-none">{companion.emoji}</div>
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-sm mt-2 flex-grow">{description}</p>
    </button>
  );
};

const CompanionSelector: React.FC<CompanionSelectorProps> = ({ selectedCompanion, onSelectCompanion, language }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      {COMPANIONS.map((companion) => (
        <CompanionCard
          key={companion.id}
          companion={companion}
          isSelected={selectedCompanion?.id === companion.id}
          onSelect={() => onSelectCompanion(companion)}
          language={language}
        />
      ))}
    </div>
  );
};

export default CompanionSelector;
