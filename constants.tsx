import React from 'react';
import { Philosopher, Theme } from './types';

// UI Translations
export const translations = {
  en: {
    headerTitle: "Wise Tales for Kids",
    headerSubtitle: "The magic of Greek philosophy in enchanting stories",
    protagonistTitle: "The Protagonist",
    protagonistDescription: "Who is this magical story for?",
    childNamePlaceholder: "Child's Name",
    agePlaceholder: "Age (2-12)",
    guideTitle: "The Guide of Wisdom",
    guideDescription: "Who will guide the hero or heroine in our story?",
    themeTitle: "The Lesson of the Day",
    themeDescription: "What valuable lesson will our hero learn today?",
    generateButton: "Generate Story!",
    generatingButton: "Creating Magic...",
    errorPrefix: "Please fill in the child's name, a valid age (2-12), choose a philosopher, and select a theme.",
    storyTitle: "Your Magical Story",
    listen_en: "Listen to Story",
    stop_en: "Stop Narration",
    listen_pt: "Ouvir a História",
    stop_pt: "Parar Narração",
    view_en: "English",
    view_pt: "Português",
    view_split: "Side-by-Side",
    footer: `© ${new Date().getFullYear()} Wise Tales. Created with inspiration and AI.`
  },
  pt: {
    headerTitle: "Contos Sábios para Crianças",
    headerSubtitle: "A magia da filosofia grega em histórias encantadoras",
    protagonistTitle: "O Protagonista",
    protagonistDescription: "Para quem é esta história mágica?",
    childNamePlaceholder: "Nome da Criança",
    agePlaceholder: "Idade (2-12)",
    guideTitle: "O Guia da Sabedoria",
    guideDescription: "Quem guiará o herói ou heroína em nossa história?",
    themeTitle: "A Lição do Dia",
    themeDescription: "Que lição valiosa nosso herói ou heroína aprenderá hoje?",
    generateButton: "Gerar História!",
    generatingButton: "Criando Magia...",
    errorPrefix: "Por favor, preencha o nome da criança, uma idade válida (2-12), escolha um filósofo e selecione um tema.",
    storyTitle: "Sua História Mágica",
    listen_en: "Listen to Story",
    stop_en: "Stop Narration",
    listen_pt: "Ouvir a História",
    stop_pt: "Parar Narração",
    view_en: "Inglês",
    view_pt: "Português",
    view_split: "Lado a Lado",
    footer: `© ${new Date().getFullYear()} Contos Sábios. Criado com inspiração e IA.`
  }
};


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

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962 3.996 3.996m0 0a3.001 3.001 0 0 1-5.196 0m5.196 0a3.001 3.001 0 0 1 0 5.196m-5.196 0a3.001 3.001 0 0 1 0-5.196m7.5-3.996-3.996-3.996A3.001 3.001 0 0 1 9 6.728a3.001 3.001 0 0 1 5.196 0 3.001 3.001 0 0 1 0 5.196M12 12.75a3 3 0 0 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

const TrophyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9 9 0 1 1 9 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.75v11.25l-3-3-3 3V3.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.375 18.75-.92-1.5m-3.955 1.5.92-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-2.485 0-4.5-2.015-4.5-4.5V12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c2.485 0 4.5-2.015 4.5-4.5V12" />
    </svg>
);

const ChatBubbleLeftRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72-3.72a1.05 1.05 0 0 0-1.485 0l-3.72 3.72a2.123 2.123 0 0 1-2.227 0l-3.72-3.72a1.05 1.05 0 0 0-1.485 0l-2.47 2.47A2.122 2.122 0 0 1 3 16.07V10.607c0-.97.616-1.813 1.5-2.097m16.5 0-2.223-2.223a1.05 1.05 0 0 0-1.485 0l-3.72 3.72a1.05 1.05 0 0 1-1.485 0l-3.72-3.72a1.05 1.05 0 0 0-1.485 0L3.75 8.511m16.5 0c-1.22.406-2.5.6-3.75.6s-2.53-.194-3.75-.6m-7.5 0c.983.324 2.037.5 3.106.5A13.48 13.48 0 0 0 15 9.111m-7.5 0c-1.22.406-2.5.6-3.75.6s-2.53-.194-3.75-.6" />
    </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.452-2.452L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.452-2.452L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.452 2.452L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.452 2.452ZM18.259 15.904 18 14.25l-.259 1.654a3.375 3.375 0 0 0-2.452 2.452L14.25 18l1.036.259a3.375 3.375 0 0 0 2.452 2.452L18 21.75l.259-1.035a3.375 3.375 0 0 0 2.452-2.452L21.75 18l-1.035-.259a3.375 3.375 0 0 0-2.452-2.452Z" />
    </svg>
);


export const PHILOSOPHERS: Philosopher[] = [
  {
    id: 'socrates',
    name_en: 'Socrates the Questioner',
    name_pt: 'Sócrates, o Questionador',
    virtue_en: 'Curiosity',
    virtue_pt: 'Curiosidade',
    description_en: 'Asking questions to find the truth.',
    description_pt: 'Fazer perguntas para encontrar a verdade.',
    icon: <AcademicCapIcon />,
    color: 'bg-blue-100',
    hoverColor: 'hover:bg-blue-200'
  },
  {
    id: 'plato',
    name_en: 'Plato the Just',
    name_pt: 'Platão, o Justo',
    virtue_en: 'Justice',
    virtue_pt: 'Justiça',
    description_en: 'Doing what is right for everyone.',
    description_pt: 'Fazer o que é certo para todos.',
    icon: <ScaleIcon />,
    color: 'bg-purple-100',
    hoverColor: 'hover:bg-purple-200'
  },
  {
    id: 'aristotle',
    name_en: 'Aristotle the Brave',
    name_pt: 'Aristóteles, o Corajoso',
    virtue_en: 'Courage',
    virtue_pt: 'Coragem',
    description_en: 'Being brave even when you are scared.',
    description_pt: 'Ser corajoso mesmo quando se está com medo.',
    icon: <ShieldCheckIcon />,
    color: 'bg-red-100',
    hoverColor: 'hover:bg-red-200'
  },
  {
    id: 'epicurus',
    name_en: 'Epicurus the Kind',
    name_pt: 'Epicuro, o Gentil',
    virtue_en: 'Friendship',
    virtue_pt: 'Amizade',
    description_en: 'The importance of sharing and caring for friends.',
    description_pt: 'A importância de compartilhar e cuidar dos amigos.',
    icon: <HeartIcon />,
    color: 'bg-green-100',
    hoverColor: 'hover:bg-green-200'
  },
  {
    id: 'diogenes',
    name_en: 'Diogenes the Honest',
    name_pt: 'Diógenes, o Honesto',
    virtue_en: 'Honesty',
    virtue_pt: 'Honestidade',
    description_en: 'Being true and simple at heart.',
    description_pt: 'Ser verdadeiro e simples de coração.',
    icon: <SunIcon />,
    color: 'bg-yellow-100',
    hoverColor: 'hover:bg-yellow-200'
  },
];

export const THEMES: Theme[] = [
  {
    id: 'sharing',
    name_en: 'Sharing',
    name_pt: 'Compartilhar',
    description_en: 'Learning to share toys and joys.',
    description_pt: 'Aprender a dividir os brinquedos e alegrias.',
    icon: <UsersIcon />,
    color: 'bg-pink-100',
    hoverColor: 'hover:bg-pink-200'
  },
  {
    id: 'sportsmanship',
    name_en: 'Sportsmanship',
    name_pt: 'Ser bom no esporte',
    description_en: 'Playing fair and being a good friend.',
    description_pt: 'Jogar de forma justa e ser um bom amigo.',
    icon: <TrophyIcon />,
    color: 'bg-orange-100',
    hoverColor: 'hover:bg-orange-200'
  },
  {
    id: 'fairness',
    name_en: 'Being Fair',
    name_pt: 'Ser Justo',
    description_en: 'Treating everyone equally.',
    description_pt: 'Tratar todo mundo de forma igual.',
    icon: <ScaleIcon />,
    color: 'bg-teal-100',
    hoverColor: 'hover:bg-teal-200'
  },
  {
    id: 'respect',
    name_en: 'Respect',
    name_pt: 'Respeito',
    description_en: 'Listening to others and being kind.',
    description_pt: 'Ouvir os outros e ser gentil.',
    icon: <ChatBubbleLeftRightIcon />,
    color: 'bg-indigo-100',
    hoverColor: 'hover:bg-indigo-200'
  },
  {
    id: 'cleanliness',
    name_en: 'Cleanliness',
    name_pt: 'Limpeza e Organização',
    description_en: 'Keeping our space and ourselves tidy.',
    description_pt: 'Manter nosso espaço e a nós mesmos arrumados.',
    icon: <SparklesIcon />,
    color: 'bg-cyan-100',
    hoverColor: 'hover:bg-cyan-200'
  },
];
