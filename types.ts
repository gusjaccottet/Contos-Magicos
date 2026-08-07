import type { ReactNode } from 'react';

export interface Philosopher {
  id: string;
  name_en: string;
  name_pt: string;
  virtue_en: string;
  virtue_pt: string;
  description_en: string;
  description_pt: string;
  icon: ReactNode;
  color: string;
  hoverColor: string;
}

export interface MagicCompanion {
  id: string;
  name_en: string;
  name_pt: string;
  emoji: string;
  description_en: string;
  description_pt: string;
  color: string;
  hoverColor: string;
}

export interface Theme {
  id: string;
  name_en: string;
  name_pt: string;
  description_en: string;
  description_pt: string;
  icon: ReactNode;
  color: string;
  hoverColor: string;
}

export type StoryLength = 'short' | 'medium' | 'long';

export interface StoryLengthOption {
  id: StoryLength;
  label_en: string;
  label_pt: string;
  description_en: string;
  description_pt: string;
}

export interface StoryContent {
  title_en: string;
  paragraphs_en: string[];
  moral_en: string;
  title_pt: string;
  paragraphs_pt: string[];
  moral_pt: string;
}

export interface StoryCustomization {
  age: number;
  childName: string;
  companion: MagicCompanion;
  length: StoryLength;
}
