import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "./components/common/layout";
import ErrorPage from "./components/common/ErrorPage";
import HomePage from '@/pages/home'
import AboutPage from '@/pages/about'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        index: true,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ]
  },
]);

export default router