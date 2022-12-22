import { FunctionComponent, useRef } from "react";
import { useSlider } from "react-use";
import { HTMLMediaState } from "react-use/lib/factory/createHTMLMediaHook";
import { DeepReadonly } from "ts-essentials";
import AudioPlayerService from "../../../services/feature/audio-player-service";
import { ServiceLocator } from "../../../services/service-locator";
import { classNames } from "../../../utils/class-helper";

interface VolumeSliderProps {
  state?: DeepReadonly<HTMLMediaState>;
}

const VolumeSlider: FunctionComponent<VolumeSliderProps> = (props) => {
  const { state } = props;

  const audioPlayerService: AudioPlayerService = ServiceLocator.resolve(
    AudioPlayerService.name
  );

  const isStateActive = !!state?.duration;

  const volumeRef = useRef<HTMLDivElement>(null);

  useSlider(volumeRef, {
    onScrub: (value) => audioPlayerService.setVolume(value),
  });

  return (
    <div
      ref={volumeRef}
      className={classNames(
        isStateActive ? "cursor-pointer" : "",
        "flex items-center w-20 group"
      )}
    >
      <div className="relative flex w-full h-1.5">
        <div className="absolute block w-full h-full rounded-md bg-bg-l-s-i dark:bg-bg-d-s-i">
          {isStateActive && (
            <div
              className="absolute block h-full rounded-md bg-p opacity-70 group-hover:opacity-100"
              style={{
                width: `${state.volume * 100}%`,
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolumeSlider;
