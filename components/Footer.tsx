import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-6 bg-amber-50 mt-12">
      <p className="text-amber-700 text-sm">
        &copy; {new Date().getFullYear()} Contos Sábios. Criado com inspiração e IA.
      </p>
    </footer>
  );
};

export default Footer;
