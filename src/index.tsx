import { FunctionComponent } from "react";
import {
  createBrowserRouter,
  matchRoutes,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import MainLayout from "./components/layout/main-layout";
import AboutPage from "./pages/about";
import ErrorPage from "./pages/error";
import HomePage from "./pages/home";
import ReaderPage from "./pages/reader";

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

const Index: FunctionComponent<IndexProps> = () => {
  return <RouterProvider router={router} />;
};

export default Index;
