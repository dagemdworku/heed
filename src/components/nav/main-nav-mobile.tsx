import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useCurrentPath } from "../..";
import { navigation } from "../../constants/navigation-constant";
import { classNames } from "../../utils/class-helper";

interface MainNavMobileProps {}

const MainNavMobile: FunctionComponent<MainNavMobileProps> = () => {
  const currentPath = useCurrentPath();

  return (
    <nav className="px-2">
      <div className="space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={classNames(
              currentPath == item.href
                ? "bg-p text-white"
                : "text-fg-l-s dark:text-fg-d-s hover:text-fg-l dark:hover:text-fg-d hover:bg-bg-l-s-i dark:hover:bg-bg-d-s-i hover:bg-opacity-50",
              "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
            )}
            aria-current={currentPath == item.href ? "page" : undefined}
          >
            <item.icon
              className="flex-shrink-0 w-6 h-6 mr-3 opacity-75"
              aria-hidden="true"
            />
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MainNavMobile;
