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
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 13.036h.008v.008h-.008v-.008Z" />
    </svg>
);

const AcademicCapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
);

const ScaleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c-.317.02-.63.037-.934.053M4.5 5.25A48.416 48.416 0 0 1 12 4.5c2.291 0 4.545.16 6.75.47m-13.5 0c.317.02.63.037.934.053m11.632 0c.662.062 1.292.14 1.897.231m-15.342 0c.604-.09 1.234-.169 1.897-.231m11.55 0a48.284 48.284 0 0 0-11.55 0m11.55 0c.23.02.457.04.68.062m-12.91 0c-.223-.022-.45-.042-.68-.062m0 0-3.181 3.181a.75.75 0 0 0 1.06 1.061L12 5.625l2.47 2.47a.75.75 0 0 0 1.06-1.06l-3.18-3.181a.75.75 0 0 0-1.061 0Zm-3.181 3.181L8.25 12.061M15.75 12.061 12 8.25" />
    </svg>
);

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591" />
    </svg>
);

export const PHILOSOPHERS: Philosopher[] = [
  {
    id: 'socrates',
    name: 'Menino Sócrates',
    virtue: 'Curiosidade',
    description: 'Fazer perguntas para encontrar a verdade.',
    icon: <AcademicCapIcon />,
    color: 'bg-blue-100',
    hoverColor: 'hover:bg-blue-200'
  },
  {
    id: 'plato',
    name: 'Mago Platão',
    virtue: 'Justiça',
    description: 'Fazer o que é certo para todos.',
    icon: <ScaleIcon />,
    color: 'bg-purple-100',
    hoverColor: 'hover:bg-purple-200'
  },
  {
    id: 'aristotle',
    name: 'Guardião Aristóteles',
    virtue: 'Coragem',
    description: 'Ser corajoso mesmo quando se tem medo.',
    icon: <ShieldCheckIcon />,
    color: 'bg-red-100',
    hoverColor: 'hover:bg-red-200'
  },
  {
    id: 'epicurus',
    name: 'Alegre Epicuro',
    virtue: 'Amizade',
    description: 'A importância de partilhar e cuidar dos amigos.',
    icon: <HeartIcon />,
    color: 'bg-green-100',
    hoverColor: 'hover:bg-green-200'
  },
  {
    id: 'diogenes',
    name: 'Aventureiro Diógenes',
    virtue: 'Honestidade',
    description: 'Ser verdadeiro e simples de coração.',
    icon: <SunIcon />,
    color: 'bg-yellow-100',
    hoverColor: 'hover:bg-yellow-200'
  },
];
