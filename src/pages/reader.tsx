import { FunctionComponent } from "react";
import AudioPlayer from "../components/players/audio-player";

interface ReaderPageProps {}

const ReaderPage: FunctionComponent<ReaderPageProps> = () => {
  return (
    <div className="flex flex-col h-full px-6 py-5 overflow-hidden bg-bg-l dark:bg-bg-d">
      <div className="flex-none">
        <div className="flex items-end">
          <div className="flex items-end flex-1">
            <div className="w-32 h-32 rounded-md bg-bg-l-s-i dark:bg-bg-d-s-i"></div>
            <div className="flex-1 ml-4">
              <h3 className="text-2xl font-semibold text-fg-l-s dark:text-fg-d-s">
                Title
              </h3>
              <h2 className="text-base font-medium text-fg-l-s-i dark:text-fg-d-s-i">
                Author
              </h2>
              <h2 className="text-sm font-medium text-fg-l-s-i dark:text-fg-d-s-i">
                year
              </h2>
            </div>
          </div>
          <div className="flex-1 ">
            <AudioPlayer isMobile={true} />
          </div>
        </div>
        <div className="mt-3">
          <h1 className="text-xl font-semibold text-fg-l dark:text-fg-d">
            Chapter
          </h1>
        </div>
      </div>

      <div className="flex-1 mt-3 overflow-y-auto">
        <p className="text-lg text-fg-l-s dark:text-fg-d-s">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit
          amet urna vitae purus ullamcorper porta. Mauris felis justo, commodo
          quis cursus non, consequat ac magna. Morbi mauris sem, faucibus ac
          tincidunt id, mattis ac elit.{" "}
          <span className="font-medium text-fg-l dark:text-fg-d">
            Ut commodo ornare volutpat.{" "}
            <span className="font-semibold underline underline-offset-4 decoration-2">
              Nam
            </span>{" "}
            eget dolor in tortor eleifend tempus.
          </span>{" "}
          Integer dignissim nibh in erat auctor, fermentum lacinia magna
          vehicula. Morbi ullamcorper neque eget semper congue. Aliquam at
          elementum nisl. Sed a neque et turpis suscipit sagittis vel malesuada
          dolor. Nullam fringilla enim ipsum, et eleifend nisl elementum quis.
          Nunc volutpat tellus risus, vitae finibus diam sollicitudin quis. Sed
          quis enim ac ligula maximus fringilla eu a arcu. Vivamus scelerisque
          sollicitudin sagittis. Aenean varius lacus urna. Proin a massa nec
          tortor facilisis lobortis. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae; Cras consectetur
          hendrerit rutrum. Maecenas eu pellentesque leo. Mauris in mattis
          magna. Nullam semper, erat vitae tincidunt suscipit, ipsum ipsum
          ornare odio, non pretium neque nisl ut erat. Etiam odio lectus,
          sollicitudin varius varius maximus, venenatis a purus. Suspendisse at
          pulvinar ligula, vitae pellentesque ex. Orci varius natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Cras interdum
          eros nulla, ut fermentum quam ultricies ac. Maecenas interdum enim sit
          amet erat porta lacinia. Nulla ligula dolor, viverra in tortor eget,
          finibus dictum nunc. Proin laoreet, felis et efficitur rutrum, mi
          felis varius diam, vestibulum lobortis nisl diam sit amet ligula.
        </p>
      </div>
    </div>
  );
};

export default ReaderPage;
