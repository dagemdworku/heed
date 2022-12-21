import { FunctionComponent } from "react";
import { classNames } from "../../utils/class-helper";

interface MainLogoProps {
  isHeader?: boolean;
}

const MainLogo: FunctionComponent<MainLogoProps> = (props) => {
  const { isHeader = false } = props;

  return (
    <div
      className={classNames(
        isHeader ? "px-4" : "px-6",
        "flex items-center flex-shrink-0"
      )}
    >
      <img className="w-auto h-8" src="/vite.svg" alt="Logo" />
      <span className="ml-2 text-lg font-bold text-fg-l-s dark:text-fg-d-s">
        Heed
      </span>
    </div>
  );
};

export default MainLogo;
