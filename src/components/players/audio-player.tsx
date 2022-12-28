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
    <span className="select-none caption-regular whitespace-nowrap">
      {state?.duration ? formatTime(state.time) : "--:--"}
    </span>
  );

  const mediaTotalTime = (
    <span className="select-none caption-regular whitespace-nowrap">
      {state?.duration ? formatTime(state.duration) : "--:--"}
    </span>
  );

  const timelineSeeker = <SeekerSlider state={state} />;

  const volumeController = <VolumeController state={state} />;

  const volumeSeeker = <VolumeSlider state={state} />;

  if (isMobile) {
    return (
      <div className="flex flex-col w-full px-3">
        <div className="flex justify-center sm:justify-between">
          {/* Audio controller */}
          {playbackController}
          <div className="items-center hidden sm:flex">
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
          <div className="justify-between hidden sm:flex">
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
      <div className="flex flex-col items-center w-full space-y-3">
        <div className="flex items-start w-full space-x-3">
          {/* Audio seeker */}
          <div className="flex flex-col flex-1">
            {timelineSeeker}
            <div className="h-2" />
            <div className="flex justify-between w-full">
              {mediaCurrentTime}
              {mediaTotalTime}
            </div>
          </div>

          {/* Volume slider */}
          {volumeSeeker}
        </div>
        {/* Audio controller */}
        <div className="mx-8">{playbackController}</div>
      </div>
    );
  }
};

export default AudioPlayer;
