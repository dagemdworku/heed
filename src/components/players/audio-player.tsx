import { FunctionComponent } from "react";
import { useAudio } from "react-use";

import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import { classNames } from "../../utils/class-helper";
import { formatTime } from "../../utils/player-helper";
import AudioController from "./audio-player-components/audio-controller";
import SeekerSlider from "./audio-player-components/seeker-slider";
import VolumeSlider from "./audio-player-components/volume-slider";

interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
}

const AudioPlayer: FunctionComponent<AudioPlayerProps> = (props) => {
  const { src, autoPlay = false } = props;

  const [audio, state, controls, ref] = useAudio({
    src,
    autoPlay: autoPlay,
  });

  const buttonClass = "text-fg-l dark:text-fg-d hover:text-p dark:hover:text-p";

  return (
    <div className="flex items-center py-4 pr-4">
      {audio}

      {/* Audio controller */}
      <AudioController state={state} controls={controls} />

      {/* Audio current time stamp */}
      {!!state.duration && (
        <span className="px-2 text-sm select-none text-fg-l dark:text-fg-d whitespace-nowrap">
          {formatTime(state.time)}
        </span>
      )}

      {/* Audio seeker */}
      <SeekerSlider state={state} controls={controls} />

      {/* Audio total duration time stamp */}
      {!!state.duration && (
        <span className="px-2 text-sm select-none text-fg-l dark:text-fg-d whitespace-nowrap">
          {formatTime(state.duration)}
        </span>
      )}

      <div className="w-2" />

      {/* Volume button */}
      <button
        className="w-6 h-6 cursor-pointer"
        onClick={() => {
          if (state.muted) controls.unmute();
          else controls.mute();
        }}
      >
        {state.muted || !state.volume ? (
          <SpeakerXMarkIcon className={classNames(buttonClass, "w-5 h-5")} />
        ) : (
          <SpeakerWaveIcon className={classNames(buttonClass, "w-5 h-5")} />
        )}
      </button>

      {/* Volume slider */}
      <VolumeSlider
        value={state.volume || 0}
        onChange={(value) => controls.volume(value)}
      />
    </div>
  );
};

export default AudioPlayer;
