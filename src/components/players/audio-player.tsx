import { FunctionComponent } from "react";
import { useSnapshot } from "valtio";
import AudioPlayerService from "../../services/feature/audio-player-service";
import { ServiceLocator } from "../../services/service-locator";

import { formatTime } from "../../utils/player-helper";
import AudioController from "./audio-player-components/audio-controller";
import SeekerSlider from "./audio-player-components/seeker-slider";
import VolumeController from "./audio-player-components/volume-controller";
import VolumeSlider from "./audio-player-components/volume-slider";

interface AudioPlayerProps {
  isMobile?: boolean;
}

const AudioPlayer: FunctionComponent<AudioPlayerProps> = (props) => {
  const { isMobile = false } = props;

  const audioPlayerService: AudioPlayerService = ServiceLocator.resolve(
    AudioPlayerService.name
  );

  const audioPlayerServiceSnapshot = useSnapshot(
    audioPlayerService.serviceState
  );

  const state = audioPlayerServiceSnapshot.state;

  const playbackController = <AudioController state={state} />;

  const mediaCurrentTime = (
    <span className="text-sm select-none text-fg-l dark:text-fg-d whitespace-nowrap">
      {state?.duration ? formatTime(state.time) : "--:--"}
    </span>
  );

  const mediaTotalTime = (
    <span className="text-sm select-none text-fg-l dark:text-fg-d whitespace-nowrap">
      {state?.duration ? formatTime(state.duration) : "--:--"}
    </span>
  );

  const timelineSeeker = <SeekerSlider state={state} />;

  const volumeController = <VolumeController state={state} />;

  const volumeSeeker = <VolumeSlider state={state} />;

  if (isMobile) {
    return (
      <div className="flex flex-col w-full px-3">
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
