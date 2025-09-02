import React from 'react';
import { Story } from '../types';

interface StoryDisplayProps {
  story: Story | null;
  imageUrl: string | null;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, imageUrl }) => {
  if (!story) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-amber-800 text-center mb-8">O Seu Conto Mágico</h2>
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 lg:p-12 border-4 border-amber-200">
        <div className="max-w-3xl mx-auto">
          {imageUrl && (
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg border-2 border-amber-100">
              <img src={imageUrl} alt="Ilustração da história" className="w-full h-auto object-cover" />
            </div>
          )}
          <h3 className="text-3xl md:text-4xl font-bold text-amber-900 text-center mb-6">{story.title}</h3>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            {story.paragraphs.map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDisplay;
