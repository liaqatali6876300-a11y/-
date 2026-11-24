export interface Masla {
  id: string;
  volume: number;
  topic: string;
  title: string;
  question: string;
  answer: string;
  dalil: string;
  explanation: string;
  keywords: string[];
}

export interface VolumeInfo {
  volume: number;
  name: string;
  subtitle: string;
  topics: string[];
  romanTopics: string[];
}

export interface QuickTopic {
  label: string;
  query: string;
}
