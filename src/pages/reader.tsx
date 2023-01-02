import { FunctionComponent } from "react";
import { useSnapshot } from "valtio";
import BookPlayer from "../components/players/book-player";
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
      <BookPlayer />
    </div>
  );
};

export default ReaderPage;
