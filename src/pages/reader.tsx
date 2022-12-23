import { FunctionComponent } from "react";
import { useSnapshot } from "valtio";
import PlayList from "../components/lists/play-list";
import AudioPlayer from "../components/players/audio-player";
import BookPlayer from "../components/players/book-player";
import PlayListService from "../services/feature/play-list-service";
import { ServiceLocator } from "../services/service-locator";

interface ReaderPageProps {}

const ReaderPage: FunctionComponent<ReaderPageProps> = () => {
  const scrollToWord = document.getElementById("scroll-to-word");
  if (scrollToWord) {
    scrollToWord.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
  const playListService: PlayListService = ServiceLocator.resolve(
    PlayListService.name
  );

  const playListServiceSnapshot = useSnapshot(playListService.serviceState);

  const playList = playListServiceSnapshot.playList;
  const currentChapter = playListServiceSnapshot.currentChapter;
  return (
    <div className="flex flex-col h-full px-6 py-5 overflow-hidden bg-bg-l dark:bg-bg-d">
      <div className="flex-none">
        <div className="flex flex-col sm:items-end sm:flex-row">
          <div className="flex items-end flex-1">
            {/* Book artwork */}
            <div className="w-24 h-24 overflow-hidden rounded-md sm:w-32 sm:h-32 bg-bg-l-s-i dark:bg-bg-d-s-i">
              <img
                className="w-full h-full"
                src={playList?.artwork}
                alt="Cover"
              />
            </div>

            {/* Book: Title, Author, and published year */}
            <div className="flex-1 ml-4">
              <h3 className="text-2xl font-semibold text-fg-l-s dark:text-fg-d-s">
                {playList?.name}
              </h3>
              <h2 className="text-base font-medium text-fg-l-s-i dark:text-fg-d-s-i">
                {playList?.author}
              </h2>
              <h2 className="text-sm font-medium text-fg-l-s-i dark:text-fg-d-s-i">
                {playList?.published}
              </h2>
            </div>
          </div>
          <div className="mt-6 sm:flex-1 sm:my-0">
            <AudioPlayer isMobile={true} />
          </div>
        </div>
        <div className="my-2">
          <h1 className="text-xl font-semibold text-center text-fg-l dark:text-fg-d sm:text-start">
            {currentChapter}
          </h1>
        </div>
      </div>

      <div className="flex mt-3 space-x-6">
        <BookPlayer />
        <PlayList />
      </div>
    </div>
  );
};

export default ReaderPage;
