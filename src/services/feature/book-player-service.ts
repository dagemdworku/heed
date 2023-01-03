import { proxy } from "valtio";
import { ChapterData, Page } from "../../models/chapter-data";
import { paginateChapter } from "../../utils/handler/page-handler";

export type BookPlayerServiceState = {
  chapterData: ChapterData | undefined;
  pages: Page[];
};

export default class BookPlayerService {
  public serviceState = proxy<BookPlayerServiceState>({
    chapterData: undefined,
    pages: [],
  });

  public async load(src?: string) {
    if (!src) return;

    try {
      const chapterData = await fetch(src, {
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

      this.serviceState.chapterData = chapterData;
    } catch (e) {
      console.log("Something went wrong loading book.");
    }
  }

  public async paginate(maxWidth?: number, maxHeight?: number) {
    if (!this.serviceState.chapterData || !maxWidth || !maxHeight) return;

    const pages = await paginateChapter(
      this.serviceState.chapterData,
      maxWidth,
      maxHeight
    );

    this.serviceState.pages = pages;
  }
}
