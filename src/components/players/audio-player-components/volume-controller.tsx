import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import { FunctionComponent } from "react";
import { HTMLMediaState } from "react-use/lib/factory/createHTMLMediaHook";
import { classNames } from "../../../utils/class-helper";

interface VolumeControllerProps {
  state: HTMLMediaState;
  controls: any;
}

const VolumeController: FunctionComponent<VolumeControllerProps> = (props) => {
  const { state, controls } = props;

  const hasAudio = !!state?.duration;

  return (
    <button
      className={classNames(
        hasAudio
          ? "cursor-pointer hover:text-p dark:hover:text-p"
          : "opacity-25",
        "p-2 rounded-full text-fg-l dark:text-fg-d"
      )}
      onClick={() => {
        if (state.muted) controls.unmute();
        else controls.mute();
      }}
      disabled={!hasAudio}
    >
      {state?.muted || !state?.volume ? (
        <SpeakerXMarkIcon className="w-5 h-5" />
      ) : (
        <SpeakerWaveIcon className="w-5 h-5" />
      )}
    </button>
  );
};

export default VolumeController;
