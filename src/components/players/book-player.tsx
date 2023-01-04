import { FunctionComponent, useEffect } from "react";
import { useResizeDetector } from "react-resize-detector";
import { DeepReadonly } from "ts-essentials";
import { useSnapshot } from "valtio";
import { Page } from "../../models/chapter-data";
import AudioPlayerService from "../../services/feature/audio-player-service";
import BookPlayerService from "../../services/feature/book-player-service";
import { ServiceLocator } from "../../services/service-locator";
import { classNames } from "../../utils/class-helper";
import { isBefore } from "../../utils/player-helper";

interface BookPlayerProps {}

const BookPlayer: FunctionComponent<BookPlayerProps> = () => {
  const { width, height, ref } = useResizeDetector();

  const bookPlayerService: BookPlayerService = ServiceLocator.resolve(
    BookPlayerService.name
  );

  const audioPlayerService: AudioPlayerService = ServiceLocator.resolve(
    AudioPlayerService.name
  );

  const bookPlayerServiceSnapshot = useSnapshot(bookPlayerService.serviceState);
  const audioPlayerServiceSnapshot = useSnapshot(
    audioPlayerService.serviceState
  );

  const pages = bookPlayerServiceSnapshot.pages;
  const pageEndingTimestamps = bookPlayerServiceSnapshot.pages.map((page) =>
    page.paragraphs.length > 0
      ? page.paragraphs[page.paragraphs.length - 1].end
      : 0
  );
  const state = audioPlayerServiceSnapshot.state;

  const additionalRow = 1;

  const playingPageIndex = Math.max(
    pageEndingTimestamps.findIndex((time) => time >= Number(state?.time)),
    0
  );

  useEffect(() => {
    bookPlayerService.paginate(width, height);
  }, [width, height, bookPlayerServiceSnapshot.chapterData]);

  return (
    <div className="flex flex-row flex-1 h-full p-6 space-x-6 overflow-y-hidden">
      <div ref={ref} className="page">
        <BookPage
          page={
            pages[
              Math.trunc(playingPageIndex / (additionalRow + 1)) *
                (additionalRow + 1)
            ]
          }
          time={state?.time}
        />
      </div>
      {[...Array(additionalRow)].map((_, index) => {
        const pageIndex =
          Math.trunc(playingPageIndex / (additionalRow + 1)) *
            (additionalRow + 1) +
          index +
          1;

        return (
          <div key={`page-${index}`} className="page">
            {pages.length > pageIndex ? (
              <BookPage page={pages[pageIndex]} time={state?.time} />
            ) : (
              <div></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

interface PageProps {
  page?: DeepReadonly<Page>;
  time?: number;
}

const BookPage: FunctionComponent<PageProps> = (props) => {
  const { page, time } = props;

  return (
    <>
      {page?.paragraphs.map((paragraph) => (
        <p
          key={paragraph.id}
          className="font-medium body-intro text-fg-l dark:text-fg-d"
        >
          {paragraph.sentences.map((sentence) =>
            sentence.words.map((word) => (
              <span
                key={word.id}
                className={classNames(
                  isBefore(time, word.begin) ? "opacity-100" : "opacity-60",
                  "word"
                )}
              >
                {word.word}{" "}
              </span>
            ))
          )}
        </p>
      ))}
    </>
  );
};

export default BookPlayer;
