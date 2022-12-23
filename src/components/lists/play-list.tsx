import { PlayIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { FunctionComponent } from "react";
import { useSnapshot } from "valtio";
import PlayListService from "../../services/feature/play-list-service";
import { ServiceLocator } from "../../services/service-locator";
import { classNames } from "../../utils/class-helper";
import { formatTime } from "../../utils/player-helper";

interface PlayListProps {}

const PlayList: FunctionComponent<PlayListProps> = () => {
  const playListService: PlayListService = ServiceLocator.resolve(
    PlayListService.name
  );

  const playListServiceSnapshot = useSnapshot(playListService.serviceState);

  const playList = playListServiceSnapshot.playList;
  const currentPlaying = playListServiceSnapshot.currentPlaying;

  return (
    <div className="flex-1">
      {playList?.chapters.map((chapter) => (
        <div
          key={chapter.id}
          className={classNames(
            chapter.id === currentPlaying
              ? "shadow-md border border-b-l dark:border-b-d"
              : "opacity-60 border border-transparent",
            "flex flex-row rounded-md items-center p-2 pr-4 space-x-2 cursor-pointer"
          )}
          onClick={() => playListService.selectChapter(chapter.id)}
        >
          <div className="p-2">
            {chapter.id === currentPlaying ? (
              <SpeakerWaveIcon className="w-5 h-5" />
            ) : (
              <PlayIcon className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm text-fg-l-s dark:text-fg-d-s">
              {playList.name}
            </p>
            <p className="font-medium text-fg-l dark:text-fg-d">
              {chapter.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-fg-l-s dark:text-fg-d-s">
              {formatTime(chapter.duration)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayList;
