export interface Virtue {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  color: string;
  hoverColor: string;
}

export interface Story {
  title: string;
  paragraphs: string[];
}
