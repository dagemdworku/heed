import { FunctionComponent } from "react";
import { HTMLMediaState } from "react-use/lib/factory/createHTMLMediaHook";
import { DeepReadonly } from "ts-essentials";
import { ButtonSize } from "../../../enum/button-enum";
import AudioPlayerService from "../../../services/feature/audio-player-service";
import { ServiceLocator } from "../../../services/service-locator";
import { classNames } from "../../../utils/class-helper";
import ForwardButton from "../../buttons/forward-button";
import PlayButton from "../../buttons/play-button";
import RewindButton from "../../buttons/rewind-button";

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
    <div className="flex h-full space-x-8">
      {/* Backward controller */}
      <RewindButton
        state={state}
        onClick={() => {
          if (canSkipBackward) audioPlayerService.seek(state.time - 30);
        }}
      />

      {/* Play / Pause controller */}
      <PlayButton
        state={state}
        onClick={() => {
          if (state!.paused) audioPlayerService.play();
          else audioPlayerService.pause();
        }}
      />

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
        <div className="relative">
          <ForwardButton size={ButtonSize.Medium} />
          <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 caption-regular">
            30
          </span>
        </div>
      </button>
    </div>
  );
};

export default AudioController;
