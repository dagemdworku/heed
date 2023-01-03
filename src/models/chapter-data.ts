export type ChapterData = {
  paragraphs: Paragraph[];
};

export type Page = {
  paragraphs: Paragraph[];
};

export type Paragraph = {
  id: string;
  begin: number;
  end: number;
  sentences: Sentence[];
};

export type Sentence = {
  id: string;
  begin: number;
  end: number;
  words: Word[];
};

export type Word = {
  id: string;
  begin: number;
  end: number;
  word: string;
};
