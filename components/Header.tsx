import React from 'react';

interface HeaderProps {
    language: 'en' | 'pt';
    setLanguage: (lang: 'en' | 'pt') => void;
    translations: {
        headerTitle: string;
        headerSubtitle: string;
    };
}

const LanguageButton: React.FC<{ onClick: () => void; isActive: boolean; children: React.ReactNode }> = ({ onClick, isActive, children }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${isActive ? 'bg-amber-800 text-white' : 'bg-amber-200 text-amber-800 hover:bg-amber-300'}`}
    >
        {children}
    </button>
);

const Header: React.FC<HeaderProps> = ({ language, setLanguage, translations }) => {
  return (
    <header className="text-center py-8 md:py-12 bg-amber-50 relative">
      <div className="absolute top-4 right-4 flex space-x-2">
        <LanguageButton onClick={() => setLanguage('en')} isActive={language === 'en'}>EN</LanguageButton>
        <LanguageButton onClick={() => setLanguage('pt')} isActive={language === 'pt'}>PT</LanguageButton>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-amber-900">
        {translations.headerTitle}
      </h1>
      <p className="text-lg md:text-xl text-amber-700 mt-2">
        {translations.headerSubtitle}
      </p>
    </header>
  );
};

export default Header;