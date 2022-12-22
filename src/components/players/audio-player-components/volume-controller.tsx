import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import { FunctionComponent } from "react";
import { HTMLMediaState } from "react-use/lib/factory/createHTMLMediaHook";
import { DeepReadonly } from "ts-essentials";
import AudioPlayerService from "../../../services/feature/audio-player-service";
import { ServiceLocator } from "../../../services/service-locator";
import { classNames } from "../../../utils/class-helper";

interface VolumeControllerProps {
  state?: DeepReadonly<HTMLMediaState>;
}

const VolumeController: FunctionComponent<VolumeControllerProps> = (props) => {
  const { state } = props;

  const audioPlayerService: AudioPlayerService = ServiceLocator.resolve(
    AudioPlayerService.name
  );

  const isStateActive = !!state?.duration;

  return (
    <button
      className={classNames(
        isStateActive
          ? "cursor-pointer hover:text-p dark:hover:text-p"
          : "opacity-25",
        "p-2 rounded-full text-fg-l dark:text-fg-d"
      )}
      onClick={() => audioPlayerService.toggleMute()}
      disabled={!isStateActive}
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
