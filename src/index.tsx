import { FunctionComponent } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/main-layout";
import AboutPage from "./pages/about";
import ErrorPage from "./pages/error";
import HomePage from "./pages/home";
import ReaderPage from "./pages/reader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "reader", element: <ReaderPage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
]);

interface IndexProps {}

const Index: FunctionComponent<IndexProps> = () => {
  return <RouterProvider router={router} />;
};

export default Index;
