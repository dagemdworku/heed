import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useCurrentPath } from "../..";
import { navigation } from "../../constants/navigation-constant";
import { classNames } from "../../utils/class-helper";
import ProfileCard from "../cards/profile-card";
import MainLogo from "../logo/main-logo";
interface MainNavDesktopProps {}

const MainNavDesktop: FunctionComponent<MainNavDesktopProps> = () => {
  const currentPath = useCurrentPath();

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-b-l dark:lg:border-b-d lg:pt-5 lg:pb-4 bg-bg-l-s dark:bg-bg-d-s">
      <MainLogo />
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-col flex-1 h-0 pt-2 mt-4 overflow-y-auto">
        {/* User account dropdown */}
        <ProfileCard />
        {/* Navigation */}
        <nav className="px-3 mt-6">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  currentPath == item.href
                    ? "bg-p text-white"
                    : "text-fg-l-s dark:text-fg-d-s hover:text-fg-l dark:hover:text-fg-d hover:bg-bg-l-s-i dark:hover:bg-bg-d-s-i hover:bg-opacity-50",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
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
      </div>
    </div>
  );
};

export default MainNavDesktop;
