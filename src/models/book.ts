export type Book = {
  id: string;
  begin: string;
  end: string;
  language: string;
  lines: string[];
  children: Book[];
};

export type Fragment = {
  fragments: Book[];
};
