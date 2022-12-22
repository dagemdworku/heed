import { FunctionComponent } from "react";
import {
  createBrowserRouter,
  matchRoutes,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { useAudio } from "react-use";
import { setupLocator } from "./app/app-locator";
import MainLayout from "./components/layout/main-layout";
import AboutPage from "./pages/about";
import ErrorPage from "./pages/error";
import HomePage from "./pages/home";
import ReaderPage from "./pages/reader";
import AudioPlayerService from "./services/feature/audio-player-service";
import { ServiceLocator } from "./services/service-locator";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "reader", element: <ReaderPage /> },
  { path: "about", element: <AboutPage /> },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: routes,
  },
]);

export const useCurrentPath = () => {
  const location = useLocation();
  const route = matchRoutes(routes, location);

  if (route) {
    return route[0].route.path;
  }

  return null;
};

interface IndexProps {}

setupLocator();
const Index: FunctionComponent<IndexProps> = () => {
  const audioPlayerService: AudioPlayerService = ServiceLocator.resolve(
    AudioPlayerService.name
  );

  const [audio, state, controls] = useAudio({
    src: "/001.mp3",
  });

  audioPlayerService.initialize(state, controls);

  return (
    <div className="screen">
      {audio}

      <RouterProvider router={router} />
    </div>
  );
};

export default Index;
