import { FunctionComponent } from "react";
import { useSnapshot } from "valtio";
import AudioPlayer from "../components/players/audio-player";
import PlayListService from "../services/feature/play-list-service";
import { ServiceLocator } from "../services/service-locator";

interface ReaderPageProps {}

const ReaderPage: FunctionComponent<ReaderPageProps> = () => {
  const playListService: PlayListService = ServiceLocator.resolve(
    PlayListService.name
  );

  const playListServiceSnapshot = useSnapshot(playListService.serviceState);

  const playList = playListServiceSnapshot.playList;
  const currentChapter = playListServiceSnapshot.currentChapter;
  return (
    <div className="flex flex-col h-full overflow-hidden bg-bg-l dark:bg-bg-d">
      <div className="relative flex-1 overflow-hidden bg-bg-l dark:bg-bg-d">
        <div
          style={{
            backgroundImage: `url(${playList?.artwork})`,
          }}
          className="absolute inset-0 scale-110 bg-center bg-cover blur-md opacity-60"
        ></div>
        <div className="absolute inset-0 grid items-center justify-center">
          <img
            className="rounded-lg shadow-md w-52"
            src={playList?.artwork}
            alt="Cover Image"
          />
        </div>
      </div>
      <div className="w-full px-8 py-6 ">
        <div className="flex flex-col w-full space-y-1">
          <p className="text-center heading-5">{playList?.name}</p>
          <p className="text-center body-intro">{currentChapter}</p>
        </div>
        <AudioPlayer />
      </div>
    </div>
  );
};

export default ReaderPage;
