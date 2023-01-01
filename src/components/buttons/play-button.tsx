import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { FunctionComponent, useEffect } from "react";
import { HTMLMediaState } from "react-use/lib/factory/createHTMLMediaHook";
import { DeepReadonly } from "ts-essentials";
import { classNames } from "../../utils/class-helper";

interface PlayButtonProps {
  state?: DeepReadonly<HTMLMediaState>;
  onClick: () => void;
}

const PlayButton: FunctionComponent<PlayButtonProps> = (props) => {
  const { state, onClick } = props;

  const stateMachines = "State";
  const artboard = "Play - Pause";

  const { rive, RiveComponent } = useRive({
    src: "rive/play_pause.riv",
    stateMachines: stateMachines,
    artboard: artboard,
    autoplay: true,
  });

  const isPlaying = useStateMachineInput(rive, stateMachines, "isPlaying");

  const isStateActive = !!state?.duration;

  useEffect(() => {
    if (isPlaying) {
      isPlaying.value = !isStateActive || !state.paused;
    }
  }, [state?.paused]);

  return (
    <button
      className={classNames(
        isStateActive ? "cursor-pointer" : "opacity-25",
        "bg-p rounded-full"
      )}
      onClick={onClick}
      disabled={!isStateActive}
    >
      <RiveComponent className="h-full aspect-square" />
    </button>
  );
};

export default PlayButton;
