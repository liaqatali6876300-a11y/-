export interface RawHadithRecord {
  id: string;
  n: string;
  b: number;
  v: number;
  p: number;
  r: string;
  a: string;
  u: string;
}

export interface Hadith {
  id: string;
  hadithNumber: string;
  bookNumber: number;
  volume: number;
  isPrimary: boolean;
  narrator: string;
  arabicText: string;
  urduText: string;
}

export interface BookMeta {
  bookNumber: number;
  volume: number;
  titleArabic: string;
  titleUrdu: string;
  titleEnglish: string;
  hadithCount: number;
  totalEntries: number;
  firstHadith: number;
  lastHadith: number;
}

export interface VolumeMeta {
  volume: number;
  name: string;
  subtitle: string;
  bookStart: number;
  bookEnd: number;
  bookCount: number;
  hadithCount: number;
  totalEntries: number;
  firstHadith: number;
  lastHadith: number;
}

export interface QuickTopic {
  label: string;
  query: string;
}
