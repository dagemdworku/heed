import { FunctionComponent } from "react";
import { useSnapshot } from "valtio";
import { ServiceLocator } from "../../../../services/service-locator";
import { formatTime } from "../../../../utils/player-helper";
import AudioController from "../../../players/audio-player-components/audio-controller";
import SeekerSlider from "../../../players/audio-player-components/seeker-slider";
import { AudioPlayerCardViewModel } from "./audio-player-card-viewmodel";

const AudioPlayerCard: FunctionComponent<{}> = () => {
  const viewModel: AudioPlayerCardViewModel = ServiceLocator.resolve(
    AudioPlayerCardViewModel.name
  );

  const playListServiceState = useSnapshot(viewModel.playListServiceState);

  const audioPlayerServiceState = useSnapshot(
    viewModel.audioPlayerServiceState
  );

  return (
    <div className="relative w-full overflow-hidden bg-bg-l dark:bg-bg-d">
      <div
        style={{
          backgroundImage: `url(${playListServiceState.playList?.artwork})`,
        }}
        className="absolute inset-0 bottom-1/2 z-0 scale-110 bg-center bg-cover blur-md opacity-60"
      />

      <div className="relative inset-0 z-10 flex flex-col items-center px-3 py-8 space-y-4">
        <img
          className="w-1/2 mx-auto rounded-lg shadow-md"
          src={playListServiceState.playList?.artwork}
          alt="Cover Image"
        />
        <div className="flex flex-col w-full space-y-1">
          <p className="text-center caption-regular text-fg-l dark:text-fg-d">
            {playListServiceState.playList?.name}
          </p>
          <p className="text-center body-bold">
            {playListServiceState.currentChapter}
          </p>
        </div>
        <div className="flex flex-col w-full space-y-2">
          <SeekerSlider state={audioPlayerServiceState.state} />
          <div className="flex justify-between w-full">
            <span className="select-none caption-regular whitespace-nowrap">
              {audioPlayerServiceState.state?.duration
                ? formatTime(audioPlayerServiceState.state.time)
                : "--:--"}
            </span>
            <span className="select-none caption-regular whitespace-nowrap">
              {audioPlayerServiceState.state?.duration
                ? formatTime(audioPlayerServiceState.state.duration)
                : "--:--"}
            </span>
          </div>
        </div>
        <div className="h-12">
          <AudioController state={audioPlayerServiceState.state} />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerCard;
