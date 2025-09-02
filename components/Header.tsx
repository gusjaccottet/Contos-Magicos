import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-8 md:py-12 bg-amber-50">
      <h1 className="text-4xl md:text-6xl font-bold text-amber-900">
        Contos Sábios para Crianças
      </h1>
      <p className="text-lg md:text-xl text-amber-700 mt-2">
        A magia da filosofia grega em histórias para encantar
      </p>
    </header>
  );
};

export default Header;
