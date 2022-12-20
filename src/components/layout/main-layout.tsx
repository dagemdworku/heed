import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../nav/main-nav";

interface MainLayoutProps {}

const MainLayout: FunctionComponent<MainLayoutProps> = () => {
  return (
    <div>
      <MainNav />
      <Outlet />
    </div>
  );
};

export default MainLayout;
