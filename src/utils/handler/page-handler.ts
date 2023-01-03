import { ChapterData, Page, Paragraph } from "../../models/chapter-data";
import {
  breakParagraph,
  divideParagraph,
  PageBreak,
} from "./paragraph-handler";

export async function paginateChapter(
  chapterData: ChapterData,
  maxWidth: number,
  maxHeight: number,
  font: string = "500 1.25rem 'Quicksand'",
  lineHeight: number = 1.3
): Promise<Page[]> {
  const pages: Page[] = [];

  _addPage(pages);

  let height: number = 0;

  for (var i = 0; i < chapterData.paragraphs.length; i++) {
    const paragraph: Paragraph = chapterData.paragraphs[i];
    const pageBreak = await breakParagraph(
      paragraph,
      maxWidth,
      maxHeight,
      height,
      font,
      lineHeight
    );

    height += pageBreak.height;

    if (height > maxHeight) {
      height = pageBreak.height - pageBreak.croppedHeight;

      _addPage(pages, paragraph, pageBreak);
    } else {
      _addParagraph(pages, paragraph);
    }
  }
  return pages;
}

function _addPage(pages: Page[], paragraph?: Paragraph, pageBreak?: PageBreak) {
  if (paragraph) {
    if (
      pageBreak &&
      !(pageBreak.sentenceBreakIndex == 0 && pageBreak.wordBreakIndex == 0)
    ) {
      const dividedParagraph = divideParagraph(paragraph, pageBreak);
      _addParagraph(pages, dividedParagraph.first);
      pages.push({ paragraphs: [] });
      _addParagraph(pages, dividedParagraph.second);
    } else {
      pages.push({ paragraphs: [] });
      _addParagraph(pages, paragraph);
    }
  } else {
    pages.push({ paragraphs: [] });
  }
}

function _addParagraph(pages: Page[], paragraph: Paragraph) {
  pages[pages.length - 1].paragraphs.push(paragraph);
}
