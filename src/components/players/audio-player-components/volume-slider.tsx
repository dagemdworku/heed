import { FunctionComponent, useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useSlider } from "react-use";
import { HTMLMediaState } from "react-use/lib/factory/createHTMLMediaHook";
import { DeepReadonly } from "ts-essentials";
import AudioPlayerService from "../../../services/feature/audio-player-service";
import { ServiceLocator } from "../../../services/service-locator";
import { classNames } from "../../../utils/class-helper";

interface VolumeSliderProps {
  state?: DeepReadonly<HTMLMediaState>;
}

const sliderHeight = 5;
const thumbWidth = 15;
const thumbHeight = 15;

const VolumeSlider: FunctionComponent<VolumeSliderProps> = (props) => {
  const { state } = props;
  const [volumePosition, setVolumePosition] = useState(0);
  const { width, ref } = useResizeDetector();

  const audioPlayerService: AudioPlayerService = ServiceLocator.resolve(
    AudioPlayerService.name
  );

  const isStateActive = !!state?.duration;

  const volumeAreaRef = ref;
  const volumeWidth = width || 0;

  useSlider(volumeAreaRef, {
    onScrub: (value) => audioPlayerService.setVolume(value),
  });

  useEffect(() => {
    setVolumePosition((state?.volume || 0) * volumeWidth);
  }, [volumeWidth, state?.volume]);

  return (
    <div
      ref={volumeAreaRef}
      className={classNames(
        isStateActive ? "cursor-pointer" : "",
        "flex items-center w-20 group"
      )}
    >
      <div
        style={{
          height: sliderHeight,
        }}
        className="relative flex w-full "
      >
        <div className="absolute block w-full h-full rounded-full bg-bg-l-s-i dark:bg-bg-d-s-i">
          {isStateActive && (
            <div>
              <div
                className="absolute rounded-full bg-fg-l-s dark:bg-fg-d-s opacity-70 group-hover:opacity-100"
                style={{
                  width: volumePosition,
                  height: sliderHeight,
                }}
              />
              <div
                className="absolute bg-fg-l-s dark:bg-fg-d-s"
                style={{
                  marginTop: (thumbHeight - sliderHeight) / -2,
                  width: thumbWidth,
                  height: thumbHeight,
                  borderRadius: thumbWidth / 2,
                  marginLeft:
                    volumePosition - thumbWidth / 2 < 0
                      ? 0
                      : volumePosition + thumbWidth > volumeWidth
                      ? volumeWidth - thumbWidth
                      : volumePosition - thumbWidth / 2,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolumeSlider;
