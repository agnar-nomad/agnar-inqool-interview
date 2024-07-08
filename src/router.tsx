import { createBrowserRouter } from "react-router-dom";
import Root from "@/components/common/RootLayout";
import ErrorPage from "@/components/common/ErrorPage";
import UsersPage from '@/pages/users'
import AnimalsPage from '@/pages/animals'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <UsersPage />,
        index: true,
      },
      {
        path: "/about",
        element: <AnimalsPage />,
      },
    ]
  },
]);

export default router