import { FunctionComponent } from "react";
import { useSnapshot } from "valtio";
import AudioPlayerService from "../../services/feature/audio-player-service";
import BookPlayerService from "../../services/feature/book-player-service";
import { ServiceLocator } from "../../services/service-locator";
import { classNames } from "../../utils/class-helper";
import { isBetween } from "../../utils/player-helper";

interface BookPlayerProps {}

const BookPlayer: FunctionComponent<BookPlayerProps> = () => {
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

  const fragment = bookPlayerServiceSnapshot.fragment;
  const state = audioPlayerServiceSnapshot.state;

  return (
    <div className="flex-1 overflow-y-auto">
      {fragment?.fragments.map((fragment) =>
        isBetween(state?.time, Number(fragment.begin), Number(fragment.end)) ? (
          fragment?.children.map((fragment) => (
            <p
              key={fragment.id}
              className="text-xl font-medium text-fg-l-s dark:text-fg-d-s"
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
        ) : (
          <span key={fragment.id} />
        )
      )}
    </div>
  );
};

export default BookPlayer;
