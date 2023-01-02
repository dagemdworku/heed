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
  const pageEndingTimestamps = bookPlayerServiceSnapshot.pageEndingTimestamps;
  const state = audioPlayerServiceSnapshot.state;

  useEffect(() => {
    bookPlayerService.paginate(width, height);
  }, [width, height, bookPlayerServiceSnapshot.fragment]);

  return (
    <div ref={ref} className="flex-1 h-full overflow-y-auto">
      {pages[
        Math.max(
          pageEndingTimestamps.findIndex((time) => time >= Number(state?.time)),
          0
        )
      ]?.fragments.map((fragment) =>
        fragment?.children.map((fragment) => (
          <p
            key={fragment.id}
            className="body-intro font-medium text-fg-l-s dark:text-fg-d-s"
          >
            {fragment?.children.map((fragment) => (
              <span
                id={
                  isBetween(
                    state?.time,
                    Number(fragment.begin),
                    Number(fragment.end)
                  )
                    ? "scroll-to-word"
                    : undefined
                }
                key={fragment.id}
                className={classNames(
                  isBetween(
                    state?.time,
                    Number(fragment.begin),
                    Number(fragment.end)
                  )
                    ? "text-fg-l dark:text-fg-d basic-4-active"
                    : "",
                  "basic-4"
                )}
              >
                {fragment.lines}{" "}
              </span>
            ))}
          </p>
        ))
      )}
    </div>
  );
};

export default BookPlayer;
