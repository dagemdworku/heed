import { FunctionComponent } from "react";
import { useSnapshot } from "valtio";
import AudioPlayer from "../components/players/audio-player";
import AudioPlayerService from "../services/feature/audio-player-service";
import BookPlayerService from "../services/feature/book-player-service";
import { ServiceLocator } from "../services/service-locator";
import { classNames } from "../utils/class-helper";
import { isBetween } from "../utils/player-helper";

interface ReaderPageProps {}

const ReaderPage: FunctionComponent<ReaderPageProps> = () => {
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
    <div className="flex flex-col h-full px-6 py-5 overflow-hidden bg-bg-l dark:bg-bg-d">
      <div className="flex-none">
        <div className="flex items-end">
          <div className="flex items-end flex-1">
            <div className="w-32 h-32 rounded-md bg-bg-l-s-i dark:bg-bg-d-s-i"></div>
            <div className="flex-1 ml-4">
              <h3 className="text-2xl font-semibold text-fg-l-s dark:text-fg-d-s">
                Title
              </h3>
              <h2 className="text-base font-medium text-fg-l-s-i dark:text-fg-d-s-i">
                Author
              </h2>
              <h2 className="text-sm font-medium text-fg-l-s-i dark:text-fg-d-s-i">
                year
              </h2>
            </div>
          </div>
          <div className="flex-1 ">
            <AudioPlayer isMobile={true} />
          </div>
        </div>
        <div className="mt-3">
          <h1 className="text-xl font-semibold text-fg-l dark:text-fg-d">
            Chapter
          </h1>
        </div>
      </div>

      <div className="flex-1 mt-3 overflow-y-auto">
        {fragment?.fragments.map((fragment) =>
          isBetween(
            state?.time,
            Number(fragment.begin),
            Number(fragment.end)
          ) ? (
            fragment?.children.map((fragment) => (
              <p
                key={fragment.id}
                className="text-xl font-medium text-fg-l-s dark:text-fg-d-s"
              >
                {fragment?.children.map((fragment) => (
                  <span
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
    </div>
  );
};

export default ReaderPage;
