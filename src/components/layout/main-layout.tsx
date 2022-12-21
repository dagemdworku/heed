import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent, useState } from "react";

import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Outlet } from "react-router-dom";
import ProfileAvatar from "../avatars/profile-avatar";
import ProfileDropdown from "../dropdowns/profile-dropdown";
import MainLogo from "../logo/main-logo";
import MainNavDesktop from "../nav/main-nav-desktop";
import MainNavMobile from "../nav/main-nav-mobile";
import AudioPlayer from "../players/audio-player";

interface MainLayoutProps {}

const MainLayout: FunctionComponent<MainLayoutProps> = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-opacity-75 bg-o-l dark:bg-o-d" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-bg-l dark:bg-bg-d">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <MainLogo isHeader={true} />
              <div className="flex-1 h-0 mt-5 overflow-y-auto">
                <MainNavMobile />
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <div className="flex-1 w-full lg:flex">
        {/* Static sidebar for desktop */}
        <MainNavDesktop />
        {/* Main column */}
        <div className="flex flex-col h-full lg:flex-1">
          {/* Header */}
          <div className="sticky top-0 z-10 flex flex-shrink-0 h-16 border-b bg-bg-l dark:bg-bg-d border-b-l dark:border-b-d lg:hidden">
            <button
              type="button"
              className="px-4 border-r border-b-l dark:border-b-d text-fg-l-s dark:text-fg-d-s focus:outline-none focus:ring-2 focus:ring-inset focus:ring-p lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="w-6 h-6" aria-hidden="true" />
            </button>
            <div className="flex justify-between flex-1 px-4 sm:px-6 lg:px-8">
              <div className="flex-1"></div>
              <div className="flex items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex items-center max-w-xs text-sm rounded-full bg-bg-l dark:bg-bg-d focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-p">
                      <span className="sr-only">Open user menu</span>
                      <ProfileAvatar isHeader={true} />
                    </Menu.Button>
                  </div>
                  <ProfileDropdown isHeader={true} />
                </Menu>
              </div>
            </div>
          </div>
          <div className="w-full h-full">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="w-full border-t bg-bg-l dark:bg-bg-d border-b-l dark:border-b-d">
        <AudioPlayer src="/001.mp3" />
      </div>
    </div>
  );
};

export default MainLayout;
