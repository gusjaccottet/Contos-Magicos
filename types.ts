export interface Philosopher {
  id: string;
  name_en: string;
  name_pt: string;
  virtue_en: string;
  virtue_pt: string;
  description_en: string;
  description_pt: string;
  icon: JSX.Element;
  color: string;
  hoverColor: string;
}

export interface StoryContent {
  title_en: string;
  paragraphs_en: string[];
  title_pt: string;
  paragraphs_pt: string[];
}

export interface StoryCustomization {
  age: number;
  childName: string;
}