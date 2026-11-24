export interface Masla {
  id: string;
  volume: number;
  sawalNumber?: number;
  topic: string;
  bab?: string;
  risalaName?: string;
  pageRef?: string;
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
  totalFatwas: number;
  rasailCount: number;
  printedPages: number;
  abwab: string[];
  rasail: string[];
  topics: string[];
  romanTopics: string[];
}

export interface QuickTopic {
  label: string;
  query: string;
}
