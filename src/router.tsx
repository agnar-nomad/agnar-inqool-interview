import { createBrowserRouter } from "react-router-dom";
import Root from "@/components/common/RootLayout";
import ErrorPage from "@/components/common/ErrorPage";
import UsersPage from '@/pages/users'
import AnimalsPage from '@/pages/animals'
import UsersEditPage from "./pages/users-edit";
import WelcomePage from "./pages/welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <WelcomePage />,
        index: true,
      },
      {
        path: "/users",
        element: <UsersPage />,
        index: true,
      },
      {
        path: "/users/new",
        element: <UsersEditPage />,
      },
      {
        path: "/users/:id",
        element: <UsersEditPage />,
      },
      {
        path: "/animals",
        element: <AnimalsPage />,
      },
    ]
  },
]);

export default router