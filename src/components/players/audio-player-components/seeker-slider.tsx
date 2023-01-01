import { FunctionComponent, useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useSlider } from "react-use";
import { HTMLMediaState } from "react-use/lib/factory/createHTMLMediaHook";
import { DeepReadonly } from "ts-essentials";
import AudioPlayerService from "../../../services/feature/audio-player-service";
import { ServiceLocator } from "../../../services/service-locator";
import { classNames } from "../../../utils/class-helper";
import { formatTime } from "../../../utils/player-helper";

interface SeekerSliderProps {
  state?: DeepReadonly<HTMLMediaState>;
}

const sliderHeight = 5;
const thumbWidth = 15;
const thumbHeight = 15;

const SeekerSlider: FunctionComponent<SeekerSliderProps> = (props) => {
  const { state } = props;
  const [seekerPosition, setSeekerPosition] = useState(0);

  const { width, ref } = useResizeDetector();

  const audioPlayerService: AudioPlayerService = ServiceLocator.resolve(
    AudioPlayerService.name
  );

  const isStateActive = !!state?.duration;

  const seekAreaRef = ref;
  const seekerWidth = width || 0;

  const seek = useSlider(seekAreaRef, {
    onScrubStop: (value) => {
      audioPlayerService.seekSlider(value);
    },
  });

  const seekValue = seek.value * seekerWidth;

  useEffect(() => {
    setSeekerPosition(
      ((state?.time || 0) / (state?.duration || 1)) * seekerWidth
    );
  }, [state?.time]);

  useEffect(() => {
    setSeekerPosition(seekValue);
  }, [seek.value]);

  return (
    <div
      ref={seekAreaRef}
      style={{
        height: sliderHeight,
      }}
      className={classNames(
        isStateActive ? "sm:cursor-pointer" : "",
        "relative flex items-center w-full"
      )}
    >
      <div
        style={{
          height: sliderHeight,
        }}
        className="relative flex w-full group"
      >
        {/* Seeker background */}
        <div
          key="seeker-background"
          className={classNames(
            !isStateActive || state?.paused
              ? "bg-bg-l-s dark:bg-bg-d-s"
              : "bg-bg-l-s-i dark:bg-bg-d-s-i",
            "absolute w-full h-full rounded-md"
          )}
        />

        {/* Seeker buffer */}
        {isStateActive &&
          !!state.buffered &&
          state.buffered.map(
            ({ start, end }: { start: number; end: number }) => (
              <div
                key={`seeker-buffer-${start}-${end}`}
                className={classNames(
                  state.paused
                    ? "bg-bg-l-s-i dark:bg-bg-d-s-i"
                    : "bg-p bg-opacity-20",
                  "absolute  rounded-md h-full"
                )}
                style={{
                  width: `${((end - start) / state.duration) * 100}%`,
                  marginLeft: start / state.duration,
                }}
              />
            )
          )}

        {/* Seeker media tracker */}
        {isStateActive && (
          <div key="seeker-media-tracker">
            <div
              className={classNames(
                !!seek!.isSliding ? "opacity-0" : "",
                state.paused ? "bg-fg-l-s-i dark:bg-fg-d-s-i" : "bg-p",
                "absolute rounded-md"
              )}
              style={{
                width: seekerPosition,
                height: sliderHeight,
              }}
            />
            <div
              className={classNames(
                !!seek!.isSliding ? "opacity-0" : "",
                state.paused ? "bg-fg-l-s-i dark:bg-fg-d-s-i" : "bg-p",
                "absolute"
              )}
              style={{
                marginTop: (thumbHeight - sliderHeight) / -2,
                width: thumbWidth,
                height: thumbHeight,
                borderRadius: thumbWidth / 2,
                marginLeft:
                  seekerPosition - thumbWidth / 2 < 0
                    ? 0
                    : seekerPosition + thumbWidth > seekerWidth
                    ? seekerWidth - thumbWidth
                    : seekerPosition - thumbWidth / 2,
              }}
            />
          </div>
        )}

        {/* Seeker slider */}
        {isStateActive && !!seek?.isSliding && (
          <div key="seeker-slider">
            <div
              className="absolute h-full rounded-md bg-fg-l-s-i dark:bg-fg-d-s-i"
              style={{
                width: seekValue,
                height: sliderHeight,
              }}
            />
            <div
              className="absolute bg-p"
              style={{
                marginTop: (thumbHeight - sliderHeight) / -2,
                width: thumbWidth,
                height: thumbHeight,
                borderRadius: thumbWidth / 2,
                marginLeft:
                  seekValue - thumbWidth / 2 < 0
                    ? 0
                    : seekValue + thumbWidth > seekerWidth
                    ? seekerWidth - thumbWidth
                    : seekValue - thumbWidth / 2,
              }}
            />
          </div>
        )}
      </div>

      {/* Seeker tooltip */}
      {isStateActive && seek!.isSliding && (
        <div
          key="seeker-tooltip"
          className="absolute"
          style={{
            top: -45 + "px",
            left: seek!.isSliding
              ? `${100 * seek!.value}%`
              : `${(100 * state!.time) / state.duration}%`,
          }}
        >
          <span className="min-w-[80px] inline-block px-2 py-2 ml-[-50%] text-sm rounded-md shadow text-fg-l-s bg-bg-l text-center">
            {formatTime(seek!.value * state.duration)}
          </span>
        </div>
      )}
    </div>
  );
};

export default SeekerSlider;
