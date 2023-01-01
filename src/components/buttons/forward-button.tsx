import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { FunctionComponent } from "react";
import { useResizeDetector } from "react-resize-detector";
import { HTMLMediaState } from "react-use/lib/factory/createHTMLMediaHook";
import { DeepReadonly } from "ts-essentials";
import { classNames } from "../../utils/class-helper";

interface ForwardButtonProps {
  state?: DeepReadonly<HTMLMediaState>;
  onClick: () => void;
}

const ForwardButton: FunctionComponent<ForwardButtonProps> = (props) => {
  const { state, onClick } = props;

  const { height, ref } = useResizeDetector();

  const stateMachines = "State";

  const { rive, RiveComponent } = useRive({
    src: "rive/rewind_forward.riv",
    stateMachines: stateMachines,
    autoplay: true,
  });

  const animate = useStateMachineInput(rive, stateMachines, "Animate");

  const isStateActive = !!state?.duration;

  const canSkipForward = isStateActive && state.duration - state.time > 30;

  return (
    <button
      ref={ref}
      className={classNames(
        canSkipForward ? "cursor-pointer" : "opacity-25",
        "rounded-full relative overflow-hidden"
      )}
      onClick={() => {
        onClick();
        animate?.fire();
      }}
      disabled={!canSkipForward}
    >
      <RiveComponent className="h-full aspect-square dark:invert -scale-x-100" />
      <p
        className={classNames(
          (height || 0) > 50 ? "caption-medium" : "caption-small-medium",
          "absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-fg-l dark:text-fg-d"
        )}
        style={{
          lineHeight: 1,
        }}
      >
        30
      </p>
    </button>
  );
};

export default ForwardButton;
