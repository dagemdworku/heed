import { proxy } from "valtio";
import { BookData, BookDataChild } from "../../models/book";
import { measureTextHeight } from "../../utils/handler/page-handler";

export type BookPlayerServiceState = {
  fragment: BookData | undefined;
  pages: BookData[];
  pageEndingTimestamps: number[];
};

export default class BookPlayerService {
  public serviceState = proxy<BookPlayerServiceState>({
    fragment: undefined,
    pages: [],
    pageEndingTimestamps: [],
  });

  public async load(src?: string) {
    if (!src) return;

    try {
      const fragment = await fetch(src, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          return data;
        });

      this.serviceState.fragment = fragment;
    } catch (e) {
      console.log("Something went wrong loading book.");
    }
  }

  public paginate(width?: number, maxHeight?: number) {
    if (!width || !maxHeight) return;

    const pages: BookData[] = [];
    this.serviceState.pageEndingTimestamps = [];

    var bookDataChildren: BookDataChild[] = [];

    const fragments = this.serviceState.fragment?.fragments ?? [];

    var height = 0;

    for (var i = 0; i < fragments.length; i++) {
      const sentences = fragments[i].children;

      for (var j = 0; j < sentences.length; j++) {
        const sentence = sentences[j].lines[0];

        const lineHeight = measureTextHeight(sentence, width);
        height += lineHeight;
      }

      if (maxHeight > height) {
        const bookDataChild: BookDataChild = {
          id: fragments[i].id,
          begin: fragments[i].begin,
          end: fragments[i].end,
          language: fragments[i].language,
          lines: fragments[i].lines,
          children: fragments[i].children,
        };

        bookDataChildren.push(bookDataChild);

        if (i === fragments.length - 1) {
          this.addPage(pages, bookDataChildren);
        }
      } else if (bookDataChildren.length > 0) {
        height = 0;
        this.addPage(pages, bookDataChildren);
        bookDataChildren = [];
      }
    }

    this.serviceState.pages = pages;
  }

  private addPage(pages: BookData[], bookDataChildren: BookDataChild[]) {
    const end = bookDataChildren[bookDataChildren.length - 1].end;

    pages.push({ fragments: bookDataChildren });
    this.serviceState.pageEndingTimestamps.push(Number(end));
  }
}
