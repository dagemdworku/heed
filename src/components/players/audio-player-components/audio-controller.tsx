import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { FunctionComponent } from "react";
import { HTMLMediaState } from "react-use/lib/factory/createHTMLMediaHook";
import { DeepReadonly } from "ts-essentials";
import AudioPlayerService from "../../../services/feature/audio-player-service";
import { ServiceLocator } from "../../../services/service-locator";
import { classNames } from "../../../utils/class-helper";

interface AudioControllerProps {
  state?: DeepReadonly<HTMLMediaState>;
}

const AudioController: FunctionComponent<AudioControllerProps> = (props) => {
  const { state } = props;

  const audioPlayerService: AudioPlayerService = ServiceLocator.resolve(
    AudioPlayerService.name
  );

  const isStateActive = !!state?.duration;
  const canSkipBackward = isStateActive && state.time > 30;
  const canSkipForward = isStateActive && state.duration - state.time > 30;

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
          if (canSkipBackward) audioPlayerService.seek(state.time - 30);
        }}
        disabled={!canSkipBackward}
      >
        <ArrowSmallLeftIcon className="inline-block w-5 h-5" />
        <span className="ml-1 text-sm">30s</span>
      </button>

      {/* Play / Pause controller */}
      <button
        className={classNames(
          isStateActive
            ? "cursor-pointer hover:text-p dark:hover:text-p"
            : "opacity-25",
          "p-3 rounded-full text-fg-l dark:text-fg-d"
        )}
        onClick={() => {
          if (state!.paused) audioPlayerService.play();
          else audioPlayerService.pause();
        }}
        disabled={!isStateActive}
      >
        {!isStateActive || state.paused ? (
          <PlayIcon className="w-7 h-7" />
        ) : (
          <PauseIcon className="w-7 h-7" />
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
          if (canSkipForward) audioPlayerService.seek(state.time + 30);
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
