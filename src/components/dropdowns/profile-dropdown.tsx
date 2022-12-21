import { Menu, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { profileMenu } from "../../constants/profile-menu-constants";
import { classNames } from "../../utils/class-helper";

interface ProfileDropdownProps {
  isHeader?: boolean;
}

const ProfileDropdown: FunctionComponent<ProfileDropdownProps> = (props) => {
  const { isHeader = false } = props;

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        className={classNames(
          isHeader
            ? "w-48 mt-2 origin-top-right"
            : "left-0 z-10 mx-3 mt-1 origin-top",
          "absolute right-0 bg-bg-l dark:bg-bg-d divide-y divide-b-l dark:divide-b-d rounded-md shadow-lg ring-1 ring-fg-l dark:ring-fg-d ring-opacity-5 focus:outline-none"
        )}
      >
        {profileMenu.map((items) => (
          <div key={items.name} className="py-1">
            {items.children.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link
                    to={item.href}
                    className={classNames(
                      active
                        ? "bg-bg-l-s-i dark:bg-bg-d-s-i text-fg-l dark:text-fg-d"
                        : "text-fg-l-s dark:text-fg-d-s",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        ))}
      </Menu.Items>
    </Transition>
  );
};

export default ProfileDropdown;
