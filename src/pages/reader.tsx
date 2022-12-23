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

  const scrollToWord = document.getElementById("scroll-to-word");
  if (scrollToWord) {
    scrollToWord.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  return (
    <div className="flex flex-col h-full px-6 py-5 overflow-hidden bg-bg-l dark:bg-bg-d">
      <div className="flex-none">
        <div className="flex flex-col sm:items-end sm:flex-row">
          <div className="flex items-end flex-1">
            {/* Book artwork */}
            <div className="w-24 h-24 overflow-hidden rounded-md sm:w-32 sm:h-32 bg-bg-l-s-i dark:bg-bg-d-s-i">
              <img className="w-full h-full" src="/001.jpeg" alt="Cover" />
            </div>

            {/* Book: Title, Author, and published year */}
            <div className="flex-1 ml-4">
              <h3 className="text-2xl font-semibold text-fg-l-s dark:text-fg-d-s">
                Foundation
              </h3>
              <h2 className="text-base font-medium text-fg-l-s-i dark:text-fg-d-s-i">
                Isaac Asimov
              </h2>
              <h2 className="text-sm font-medium text-fg-l-s-i dark:text-fg-d-s-i">
                1951
              </h2>
            </div>
          </div>
          <div className="mt-6 sm:flex-1 sm:my-0">
            <AudioPlayer isMobile={true} />
          </div>
        </div>
        <div className="my-2">
          <h1 className="text-xl font-semibold text-center text-fg-l dark:text-fg-d sm:text-start">
            Chapter 1
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
    </div>
  );
};

export default ReaderPage;
