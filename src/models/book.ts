export type BookDataChild = {
  id: string;
  begin: string;
  end: string;
  language: string;
  lines: string[];
  children: BookDataChild[];
};

export type BookData = {
  fragments: BookDataChild[];
};
