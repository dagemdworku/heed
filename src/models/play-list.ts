export type Chapter = {
  id: string;
  index: number;
  name: string;
  duration: number;
  audio: string;
  book: string;
};

export type PlayList = {
  name: string;
  author: string;
  published: string;
  artwork: string;
  chapters: Chapter[];
};
