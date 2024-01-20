export interface Header {
  english: string;
  spanish: string;
  pronunciation: string;
  category: string;
}

export interface Apuntes {
  englishPhrase: string;
  spanishPhrase: string;
  howToPronounce: string;
  assignedCategory: string;
}

export interface ResApuntes {
  headers: string[];
  rows: string[][];
  categories: string[];
}

export interface StatePlaying {
  currentWord: undefined | string;
  isPlaying: boolean;
}
