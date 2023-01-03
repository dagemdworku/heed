import {
  ChapterData,
  Page,
  Paragraph,
  Sentence,
} from "../../models/chapter-data";

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
    const text = _getParagraphText(paragraph);
    const paragraphHeight = await _getLinesHeight(
      text,
      maxWidth,
      font,
      lineHeight
    );

    height += paragraphHeight;

    if (height <= maxHeight) {
      _addParagraph(pages, paragraph);
    } else {
      height = paragraphHeight;
      _addPage(pages);
      _addParagraph(pages, paragraph);
    }
  }
  return pages;
}

function _addPage(pages: Page[]) {
  const page: Page = { paragraphs: [] };
  pages.push(page);
}

function _addParagraph(pages: Page[], paragraph: Paragraph) {
  pages[pages.length - 1].paragraphs.push(paragraph);
}

async function _getLinesHeight(
  text: string,
  maxWidth: number,
  font: string,
  lineHeight: number
): Promise<number> {
  if (text.length == 0 || maxWidth == 0) return 0;

  await document.fonts.load(font);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) return 0;

  context.font = font;

  const words = text.split(" ");

  let height = 0;
  let line = "";

  for (const word of words) {
    const lineWithWord = line + word + " ";
    const lineWidth = context.measureText(lineWithWord).width;

    if (lineWidth > maxWidth) {
      height += context.measureText(line).fontBoundingBoxAscent;
      line = word + " ";
    } else {
      line = lineWithWord;
    }
  }

  height += context.measureText(line).fontBoundingBoxAscent;

  return height * lineHeight;
}

function _getParagraphText(paragraph: Paragraph): string {
  let text: string = "";
  for (var i = 0; i < paragraph.sentences.length; i++) {
    const sentence: Sentence = paragraph.sentences[i];
    for (var j = 0; j < sentence.words.length; j++) {
      const word = sentence.words[j].word;
      text += `${word} `;
    }
    text += " ";
  }

  return text;
}
