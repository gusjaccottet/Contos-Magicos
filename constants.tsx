import React from 'react';
import { Philosopher } from './types';

// Heroicons - https://heroicons.com/
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);

const ShieldCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
    </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);

const ScaleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52v1.666c0 .414-.168.79-.44 1.06l-1.928 1.928a1.125 1.125 0 0 1-1.591 0l-1.928-1.928a1.125 1.125 0 0 1-.439-1.06V4.971m-2.112 0A48.38 48.38 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m-3.375 0c1.01.143 2.01.317 3 .52m-3-.52v1.666c0 .414.168.79.44 1.06l1.928 1.928a1.125 1.125 0 0 0 1.591 0l1.928-1.928a1.125 1.125 0 0 0 .439-1.06V4.971" />
    </svg>
);

const GiftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A3.375 3.375 0 0 0 8.625 8.25H15.375A3.375 3.375 0 0 0 12 4.875Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.875v16.5M8.25 12h7.5" />
    </svg>
);


export const PHILOSOPHERS: Philosopher[] = [
  {
    id: 'socrates',
    name: 'Sócrates',
    virtue: 'Sabedoria',
    description: 'Ensina a fazer perguntas e a procurar sempre a verdade para tomar boas decisões.',
    icon: <SparklesIcon />,
    color: 'bg-blue-100 border-blue-300 text-blue-800',
    hoverColor: 'hover:bg-blue-200 hover:border-blue-400',
  },
  {
    id: 'epictetus',
    name: 'Epicteto',
    virtue: 'Coragem',
    description: 'Mostra como ser forte por dentro e enfrentar desafios sem medo, focando no que podemos controlar.',
    icon: <ShieldCheckIcon />,
    color: 'bg-red-100 border-red-300 text-red-800',
    hoverColor: 'hover:bg-red-200 hover:border-red-400',
  },
  {
    id: 'aristotle',
    name: 'Aristóteles',
    virtue: 'Temperança',
    description: 'Explica a importância do equilíbrio, de não ter nem muito nem pouco de nada.',
    icon: <HeartIcon />,
    color: 'bg-green-100 border-green-300 text-green-800',
    hoverColor: 'hover:bg-green-200 hover:border-green-400',
  },
  {
    id: 'plato',
    name: 'Platão',
    virtue: 'Justiça',
    description: 'Ajuda a entender o que é ser justo e honesto com todos os amigos e na comunidade.',
    icon: <ScaleIcon />,
    color: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    hoverColor: 'hover:bg-yellow-200 hover:border-yellow-400',
  },
  {
    id: 'diotima',
    name: 'Diotima',
    virtue: 'Generosidade',
    description: 'Inspira a partilhar amor e bondade, criando coisas belas para o mundo.',
    icon: <GiftIcon />,
    color: 'bg-purple-100 border-purple-300 text-purple-800',
    hoverColor: 'hover:bg-purple-200 hover:border-purple-400',
  },
];
