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
  isMobile?: boolean;
}

const AudioPlayer: FunctionComponent<AudioPlayerProps> = (props) => {
  const { src, autoPlay = false, isMobile = false } = props;

  const [audio, state, controls, ref] = useAudio({
    src,
    autoPlay: autoPlay,
  });

  const buttonClass = "text-fg-l dark:text-fg-d hover:text-p dark:hover:text-p";

  const playbackController = (
    <AudioController state={state} controls={controls} />
  );

  const mediaCurrentTime = !!state.duration && (
    <span className="text-sm select-none text-fg-l dark:text-fg-d whitespace-nowrap">
      {formatTime(state.time)}
    </span>
  );

  const mediaTotalTime = !!state.duration && (
    <span className="text-sm select-none text-fg-l dark:text-fg-d whitespace-nowrap">
      {formatTime(state.duration)}
    </span>
  );

  const timelineSeeker = <SeekerSlider state={state} controls={controls} />;

  const volumeController = (
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
  );

  const volumeSeeker = (
    <VolumeSlider
      value={state.volume || 0}
      onChange={(value) => controls.volume(value)}
    />
  );

  if (isMobile) {
    return (
      <div className="flex flex-col w-full px-3">
        {audio}

        <div className="flex justify-between">
          {/* Audio controller */}
          {playbackController}
          <div className="flex items-center">
            {/* Volume button */}
            {volumeController}

            {/* Volume slider */}
            {volumeSeeker}
          </div>
        </div>
        <div className="h-4" />
        <div className="flex flex-col">
          {/* Audio seeker */}
          {timelineSeeker}
          <div className="h-1"></div>
          <div className="flex justify-between">
            {/* Audio current time stamp */}
            {mediaCurrentTime}

            {/* Audio total duration time stamp */}
            {mediaTotalTime}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center py-4 pr-4">
        {audio}

        {/* Audio controller */}
        <div className="mx-8">{playbackController}</div>

        {/* Audio current time stamp */}
        {mediaCurrentTime}
        <div className="w-2"></div>

        {/* Audio seeker */}
        {timelineSeeker}
        <div className="w-2"></div>

        {/* Audio total duration time stamp */}
        {mediaTotalTime}

        <div className="w-2" />

        {/* Volume button */}
        {volumeController}

        {/* Volume slider */}
        {volumeSeeker}
      </div>
    );
  }
};

export default AudioPlayer;
