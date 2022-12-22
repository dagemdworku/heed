import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { FunctionComponent } from "react";
import { HTMLMediaState } from "react-use/lib/factory/createHTMLMediaHook";
import { classNames } from "../../../utils/class-helper";

interface AudioControllerProps {
  state: HTMLMediaState;
  controls: any;
}

const AudioController: FunctionComponent<AudioControllerProps> = (props) => {
  const { state, controls } = props;

  const hasAudio = !!state?.duration;
  const canSkipBackward = hasAudio && state.time > 30;
  const canSkipForward = hasAudio && state.duration - state.time > 30;

  return (
    <div className="flex justify-between w-48">
      {/* Backward controller */}
      <button
        className={classNames(
          canSkipBackward
            ? "cursor-pointer hover:text-p dark:hover:text-p"
            : "opacity-25",
          "p-2 rounded-full flex items-center text-fg-l dark:text-fg-d"
        )}
        onClick={() => {
          if (canSkipBackward) controls.seek(state.time - 30);
        }}
        disabled={!canSkipBackward}
      >
        <ArrowSmallLeftIcon className="inline-block w-5 h-5" />
        <span className="ml-1 text-sm">30s</span>
      </button>

      {/* Play / Pause controller */}
      <button
        className={classNames(
          hasAudio
            ? "cursor-pointer hover:text-p dark:hover:text-p"
            : "opacity-25",
          "p-2 rounded-full text-fg-l dark:text-fg-d"
        )}
        onClick={() => {
          if (state.paused) controls.play();
          else controls.pause();
        }}
        disabled={!hasAudio}
      >
        {!hasAudio || state.paused ? (
          <PlayIcon className="w-6 h-6" />
        ) : (
          <PauseIcon className="w-6 h-6" />
        )}
      </button>

      {/* Forward controller */}
      <button
        className={classNames(
          canSkipForward
            ? "cursor-pointer hover:text-p dark:hover:text-p"
            : "opacity-25",
          "p-2 rounded-full flex items-center text-fg-l dark:text-fg-d"
        )}
        onClick={() => {
          if (canSkipForward) controls.seek(state.time + 30);
        }}
        disabled={!canSkipForward}
      >
        <span className="mr-1 text-sm">30s</span>
        <ArrowSmallRightIcon className="inline-block w-5 h-5" />
      </button>
    </div>
  );
};

export default AudioController;
