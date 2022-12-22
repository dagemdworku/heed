import { FunctionComponent, useRef } from "react";
import { useSlider } from "react-use";
import {
  HTMLMediaControls,
  HTMLMediaState,
} from "react-use/lib/factory/createHTMLMediaHook";
import { classNames } from "../../../utils/class-helper";
import { formatTime } from "../../../utils/player-helper";

type PlayerState = HTMLMediaState;
type PlayerControls = HTMLMediaControls;

interface SeekerSliderProps {
  state: HTMLMediaState;
  controls: any;
}

const SeekerSlider: FunctionComponent<SeekerSliderProps> = (props) => {
  const { state, controls } = props;

  const hasAudio = !!state?.duration;

  const latestState = useRef<PlayerState>(state);
  latestState.current = state;

  const latestControls = useRef<PlayerControls>(controls);
  latestControls.current = controls;

  const seekAreaRef = useRef<HTMLDivElement>(null);

  const seek = useSlider(seekAreaRef, {
    onScrubStop: (value) => {
      if (!latestState.current.duration) return;
      latestControls.current.seek(
        Math.round(latestState.current.duration * value)
      );
    },
  });

  return (
    <div
      ref={seekAreaRef}
      className={classNames(
        hasAudio ? "cursor-pointer" : "",
        "relative flex items-center flex-1 h-full"
      )}
    >
      <div className="relative flex w-full h-1.5 group">
        {/* Seeker background */}
        <div
          className={classNames(
            !hasAudio || state?.paused
              ? "bg-bg-l-s dark:bg-bg-d-s"
              : "bg-bg-l-s-i dark:bg-bg-d-s-i",
            "absolute w-full h-full rounded-md"
          )}
        />

        {/* Seeker buffer */}
        {hasAudio &&
          !!state.buffered &&
          state.buffered.map(
            ({ start, end }: { start: number; end: number }) => (
              <div
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
        {hasAudio && (
          <div>
            <div
              className={classNames(
                !!seek.isSliding ? "opacity-0" : "",
                state.paused ? "bg-fg-l-s-i dark:bg-fg-d-s-i" : "bg-p",
                "absolute h-full rounded-md"
              )}
              style={{
                width: `${((state.time || 0) / state.duration) * 100}%`,
              }}
            />
            <div
              className={classNames(
                !!seek.isSliding ? "opacity-0" : "",
                state.paused ? "bg-fg-l-s-i dark:bg-fg-d-s-i" : "bg-p",
                "absolute w-[6px] h-3 rounded-sm"
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
        {hasAudio && !!seek?.isSliding && (
          <div>
            <div
              className="absolute h-full rounded-md bg-fg-l-s-i dark:bg-fg-d-s-i"
              style={{
                width: `${seek.value * 100}%`,
              }}
            />
            <div
              className="absolute w-[6px] h-3 rounded-sm bg-p"
              style={{
                marginTop: "-3px",
                marginLeft: `calc(${seek.value * 100}% - 3px)`,
              }}
            />
          </div>
        )}
      </div>

      {/* Seeker tooltip */}
      {hasAudio && seek.isSliding && (
        <div
          className="absolute"
          style={{
            top: -45 + "px",
            left: seek.isSliding
              ? `${100 * seek.value}%`
              : `${(100 * state.time) / state.duration}%`,
          }}
        >
          <span className="min-w-[80px] inline-block px-2 py-2 ml-[-50%] text-sm rounded-md shadow text-fg-l-s bg-bg-l text-center">
            {formatTime(seek.value * state.duration)}
          </span>
        </div>
      )}
    </div>
  );
};

export default SeekerSlider;
