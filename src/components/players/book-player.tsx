import { FunctionComponent, useEffect } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useSnapshot } from "valtio";
import AudioPlayerService from "../../services/feature/audio-player-service";
import BookPlayerService from "../../services/feature/book-player-service";
import { ServiceLocator } from "../../services/service-locator";
import { classNames } from "../../utils/class-helper";
import { isBetween } from "../../utils/player-helper";

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

  useEffect(() => {
    bookPlayerService.paginate(width, height);
  }, [width, height, bookPlayerServiceSnapshot.chapterData]);

  return (
    <div ref={ref} className="flex-1 h-full overflow-y-auto">
      {pages[
        Math.max(
          pageEndingTimestamps.findIndex((time) => time >= Number(state?.time)),
          0
        )
      ]?.paragraphs.map((paragraph) => (
        <p
          key={paragraph.id}
          className="body-intro font-medium text-fg-l-s dark:text-fg-d-s"
        >
          {paragraph.sentences.map((sentence) =>
            sentence.words.map((word) => (
              <span
                key={word.id}
                id={
                  isBetween(state?.time, Number(word.begin), Number(word.end))
                    ? "scroll-to-word"
                    : undefined
                }
                className={classNames(
                  isBetween(state?.time, Number(word.begin), Number(word.end))
                    ? "text-fg-l dark:text-fg-d basic-4-active"
                    : "",
                  "basic-4"
                )}
              >
                {word.word}{" "}
              </span>
            ))
          )}
        </p>
      ))}
    </div>
  );
};

export default BookPlayer;
