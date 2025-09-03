export interface Philosopher {
  id: string;
  name: string;
  virtue: string;
  description: string;
  icon: JSX.Element;
  color: string;
  hoverColor: string;
}

export interface StoryContent {
  title: string;
  paragraphs: string[];
}

export interface Story {
  pt: StoryContent;
  en_gb: StoryContent;
}

export interface StoryCustomization {
  age: number;
  childName: string;
  debateTopic?: string;
  storyTheme?: string;
  includePrincess: boolean;
  princessName?: string;
  includeElf: boolean;
  elfName?: string;
  secondaryPhilosopherId?: string;
}

export interface PreMadeStory {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  story: Story;
  videoUrl: string;
}