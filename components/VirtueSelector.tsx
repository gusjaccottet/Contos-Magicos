import React from 'react';
import { Virtue } from '../types';
import { VIRTUES } from '../constants';

interface VirtueSelectorProps {
  selectedVirtue: Virtue | null;
  onSelectVirtue: (virtue: Virtue) => void;
}

const VirtueCard: React.FC<{ virtue: Virtue; isSelected: boolean; onSelect: () => void }> = ({ virtue, isSelected, onSelect }) => {
  const selectionClasses = isSelected 
    ? `ring-4 ring-offset-2 ${virtue.color.replace('bg-', 'ring-').replace('100', '400')}` 
    : 'ring-1 ring-gray-200';

  return (
    <button
      onClick={onSelect}
      className={`flex flex-col items-center justify-start text-center p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${virtue.color} ${virtue.hoverColor} ${selectionClasses}`}
    >
      <div className="mb-3">{virtue.icon}</div>
      <h3 className="text-xl font-bold">{virtue.name}</h3>
      <p className="text-sm mt-1 flex-grow">{virtue.description}</p>
    </button>
  );
};


const VirtueSelector: React.FC<VirtueSelectorProps> = ({ selectedVirtue, onSelectVirtue }) => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-amber-800 text-center mb-2">1. Escolha uma Virtude</h2>
      <p className="text-center text-amber-700 mb-6">Qual lição o nosso herói ou heroína irá aprender?</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {VIRTUES.map((virtue) => (
          <VirtueCard
            key={virtue.id}
            virtue={virtue}
            isSelected={selectedVirtue?.id === virtue.id}
            onSelect={() => onSelectVirtue(virtue)}
          />
        ))}
      </div>
    </div>
  );
};

export default VirtueSelector;
