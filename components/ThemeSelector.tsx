import React from 'react';
import { Theme } from '../types';
import { THEMES } from '../constants';

interface ThemeSelectorProps {
  selectedTheme: Theme | null;
  onSelectTheme: (theme: Theme) => void;
  language: 'en' | 'pt';
}

const ThemeCard: React.FC<{ theme: Theme; isSelected: boolean; onSelect: () => void; language: 'en' | 'pt' }> = ({ theme, isSelected, onSelect, language }) => {
  const selectionClasses = isSelected 
    ? `ring-4 ring-offset-2 ${theme.color.replace('bg-', 'ring-').replace('100', '400')}` 
    : 'ring-1 ring-gray-200';
    
  const name = language === 'en' ? theme.name_en : theme.name_pt;
  const description = language === 'en' ? theme.description_en : theme.description_pt;

  return (
    <button
      onClick={onSelect}
      className={`flex flex-col items-center justify-start text-center p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${theme.color} ${theme.hoverColor} ${selectionClasses} h-full`}
    >
      <div className="mb-3">{theme.icon}</div>
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-sm mt-1 flex-grow">{description}</p>
    </button>
  );
};


const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onSelectTheme, language }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      {THEMES.map((theme) => (
        <ThemeCard
          key={theme.id}
          theme={theme}
          isSelected={selectedTheme?.id === theme.id}
          onSelect={() => onSelectTheme(theme)}
          language={language}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;