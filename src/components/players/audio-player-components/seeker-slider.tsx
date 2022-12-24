import { FunctionComponent, useRef } from "react";
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

const SeekerSlider: FunctionComponent<SeekerSliderProps> = (props) => {
  const { state } = props;

  const audioPlayerService: AudioPlayerService = ServiceLocator.resolve(
    AudioPlayerService.name
  );

  const isStateActive = !!state?.duration;

  const seekAreaRef = useRef<HTMLDivElement>(null);

  const seek = useSlider(seekAreaRef, {
    onScrubStop: (value) => audioPlayerService.seekSlider(value),
  });

  return (
    <div
      ref={seekAreaRef}
      className={classNames(
        isStateActive ? "sm:cursor-pointer" : "",
        "relative flex items-center flex-1 h-full"
      )}
    >
      <div className="relative flex w-full h-1.5 group">
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
                "absolute h-full rounded-md"
              )}
              style={{
                width: `${((state.time || 0) / state.duration) * 100}%`,
              }}
            />
            <div
              className={classNames(
                !!seek!.isSliding ? "opacity-0" : "",
                state.paused ? "bg-fg-l-s-i dark:bg-fg-d-s-i" : "bg-p",
                "absolute w-[6px] h-3 rounded-sm hidden sm:block"
              )}
              style={{
                marginTop: "-3px",
                marginLeft: `calc(${
                  ((state.time || 0) / state.duration) * 100
                }% - 3px)`,
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
                width: `${seek.value * 100}%`,
              }}
            />
            <div
              className="absolute w-[6px] h-3 rounded-sm bg-p hidden sm:block"
              style={{
                marginTop: "-3px",
                marginLeft: `calc(${seek.value * 100}% - 3px)`,
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
