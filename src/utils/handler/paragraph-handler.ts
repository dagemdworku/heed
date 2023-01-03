import { Paragraph, Sentence } from "../../models/chapter-data";

export type PageBreak = {
  height: number;
  croppedHeight: number;
  sentenceBreakIndex: number;
  wordBreakIndex: number;
};

export type DividedParagraph = {
  first: Paragraph;
  second: Paragraph;
};

export function divideParagraph(
  paragraph: Paragraph,
  pageBreak: PageBreak
): DividedParagraph {
  const firstParagraphSentences: Sentence[] = [];
  const secondParagraphSentences: Sentence[] = [];

  for (let i = 0; i < pageBreak.sentenceBreakIndex + 1; i++) {
    const sentence: Sentence = paragraph.sentences[i];
    if (i < pageBreak.sentenceBreakIndex) {
      firstParagraphSentences.push(sentence);
    } else {
      const croppedSentence: Sentence = {
        id: sentence.id,
        begin: sentence.begin,
        end: sentence.end,
        words: sentence.words.slice(0, pageBreak.wordBreakIndex + 1),
      };
      firstParagraphSentences.push(croppedSentence);
    }
  }

  for (
    let i = pageBreak.sentenceBreakIndex;
    i < paragraph.sentences.length;
    i++
  ) {
    const sentence: Sentence = paragraph.sentences[i];
    if (i > pageBreak.sentenceBreakIndex) {
      secondParagraphSentences.push(sentence);
    } else {
      const croppedSentence: Sentence = {
        id: sentence.id,
        begin: sentence.begin,
        end: sentence.end,
        words: sentence.words.slice(pageBreak.wordBreakIndex + 1),
      };
      secondParagraphSentences.push(croppedSentence);
    }
  }

  const firstParagraphEnd: number = firstParagraphSentences
    .slice(-1)[0]
    .words.slice(-1)[0].end;
  const secondParagraphBegin: number =
    secondParagraphSentences[0].words[0].begin;

  const firstParagraph: Paragraph = {
    id: `${paragraph.id}first`,
    begin: paragraph.begin,
    end: firstParagraphEnd,
    sentences: firstParagraphSentences,
  };

  const secondParagraph: Paragraph = {
    id: `${paragraph.id}second`,
    begin: secondParagraphBegin,
    end: paragraph.end,
    sentences: secondParagraphSentences,
  };

  return { first: firstParagraph, second: secondParagraph };
}

export async function breakParagraph(
  paragraph: Paragraph,
  maxWidth: number,
  maxHeight: number,
  prevHeight: number,
  font: string,
  lineHeight: number
): Promise<PageBreak> {
  if (maxWidth == 0)
    return {
      height: 0,
      croppedHeight: 0,
      sentenceBreakIndex: 0,
      wordBreakIndex: 0,
    };

  await document.fonts.load(font);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context)
    return {
      height: 0,
      croppedHeight: 0,
      sentenceBreakIndex: 0,
      wordBreakIndex: 0,
    };

  context.font = font;

  let height = 0;
  let croppedHeight = 0;
  let line: string[] = [];

  let prevCroppedHeight = 0;
  let prevSentenceIndex = 0;
  let prevWordIndex = 0;

  let hasBreakSet = false;
  let sentenceBreakIndex = 0;
  let wordBreakIndex = 0;

  function addHeight(
    textHeight: number,
    sentenceIndex: number,
    wordIndex: number,
    line?: string
  ) {
    height += textHeight;

    if (!hasBreakSet) {
      if (prevHeight + height * lineHeight > maxHeight) {
        hasBreakSet = true;
        croppedHeight = prevCroppedHeight;
        sentenceBreakIndex = prevSentenceIndex;
        wordBreakIndex = prevWordIndex;
      } else {
        prevCroppedHeight = height;
        prevSentenceIndex = sentenceIndex;
        prevWordIndex = wordIndex;
      }
    }
  }

  for (
    let sentenceIndex = 0;
    sentenceIndex < paragraph.sentences.length;
    sentenceIndex++
  ) {
    const sentence: Sentence = paragraph.sentences[sentenceIndex];
    for (let wordIndex = 0; wordIndex < sentence.words.length; wordIndex++) {
      const word = sentence.words[wordIndex].word;

      line.push(word);

      const measurement = context.measureText(line.join(" "));

      if (measurement.width > maxWidth) {
        addHeight(
          measurement.fontBoundingBoxAscent,
          sentenceIndex,
          wordIndex - 1,
          line.join(" ")
        );
        line = [word];
      }
    }
  }

  addHeight(
    context.measureText(line.join(" ")).fontBoundingBoxAscent,
    paragraph.sentences.length - 1,
    paragraph.sentences.slice(-1)[0].words.length - 1,
    line.join(" ")
  );

  return {
    height: height * lineHeight,
    croppedHeight: croppedHeight * lineHeight,
    sentenceBreakIndex: sentenceBreakIndex,
    wordBreakIndex: wordBreakIndex,
  };
}
