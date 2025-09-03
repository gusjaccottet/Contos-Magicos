import React from 'react';

interface FooterProps {
    text: string;
}

const Footer: React.FC<FooterProps> = ({ text }) => {
  return (
    <footer className="text-center py-6 bg-amber-50 mt-12">
      <p className="text-amber-700 text-sm">
        {text}
      </p>
    </footer>
  );
};

export default Footer;