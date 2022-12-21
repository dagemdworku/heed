import { FunctionComponent } from "react";

import { Menu } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import ProfileAvatar from "../avatars/profile-avatar";
import ProfileDropdown from "../dropdowns/profile-dropdown";

interface ProfileCardProps {}

const ProfileCard: FunctionComponent<ProfileCardProps> = () => {
  return (
    <Menu as="div" className="relative inline-block px-3 text-left">
      <div>
        <Menu.Button className="w-full px-3.5 py-2 text-sm font-medium text-left rounded-md group bg-bg-l-s dark:bg-bg-d-s hover:bg-bg-l-s-i dark:hover:bg-bg-d-s-i focus:bg-bg-l dark:focus:bg-bg-d text-fg-l dark:text-fg-d focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-l-s dark:focus:ring-offset-bg-d-s focus:ring-p">
          <span className="flex items-center justify-between w-full">
            <span className="flex items-center justify-between min-w-0 space-x-3">
              <ProfileAvatar />
              <span className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-medium truncate text-fg-l dark:text-fg-d">
                  Dagem Worku
                </span>
                <span className="text-sm truncate text-fg-l-s dark:text-fg-d-s">
                  @dagemdworku
                </span>
              </span>
            </span>
            <ChevronUpDownIcon
              className="flex-shrink-0 w-5 h-5 text-fg-l-s-i dark:text-fg-d-s-i group-hover:text-fg-l-s dark:group-hover:text-fg-d-s"
              aria-hidden="true"
            />
          </span>
        </Menu.Button>
      </div>
      <ProfileDropdown />
    </Menu>
  );
};

export default ProfileCard;
