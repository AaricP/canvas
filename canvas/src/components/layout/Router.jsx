import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "../../pages/ErrorPage";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ProfilePage from "../../pages/ProfilePage";
import ListAnnounces from "../../pages/announcements/ListAnnounces";
import ViewAnnounce from "../../pages/announcements/ViewAnnounce";
import CreateAnnounce from "../../pages/announcements/CreateAnnounce";
import EditAnnounce from "../../pages/announcements/EditAnnounce";
import ListModules from "../../pages/modules/ListModules";
import CreateModule from "../../pages/modules/CreateModule";
import EditModule from "../../pages/modules/EditModule";
import ListPages from "../../pages/pages/ListPages";
import ViewPage from "../../pages/pages/ViewPage";
import CreatePage from "../../pages/pages/CreatePage";
import EditPage from "../../pages/pages/EditPage";
import ProtectedRoutes from "../common/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "loginpage", element: <LoginPage /> },
      { path: "registerpage", element: <RegisterPage /> },
      {
        path: "profilepage",
        element: (
          <ProtectedRoutes>
            <ProfilePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "announcements",
        element: (
          <ProtectedRoutes>
            <ListAnnounces />
          </ProtectedRoutes>
        ),
      },
      {
        path: "announcements/view/:id",
        element: (
          <ProtectedRoutes>
            <ViewAnnounce />
          </ProtectedRoutes>
        ),
      },
      {
        path: "announcements/create",
        element: (
          <ProtectedRoutes>
            <CreateAnnounce />
          </ProtectedRoutes>
        ),
      },
      {
        path: "announcements/edit/:id",
        element: (
          <ProtectedRoutes>
            <EditAnnounce />
          </ProtectedRoutes>
        ),
      },
      {
        path: "modules",
        element: (
          <ProtectedRoutes>
            <ListModules />
          </ProtectedRoutes>
        ),
      },
      {
        path: "modules/create",
        element: (
          <ProtectedRoutes>
            <CreateModule />
          </ProtectedRoutes>
        ),
      },
      {
        path: "modules/edit/:id",
        element: (
          <ProtectedRoutes>
            <EditModule />
          </ProtectedRoutes>
        ),
      },
      {
        path: "pages",
        element: (
          <ProtectedRoutes>
            <ListPages />
          </ProtectedRoutes>
        ),
      },
      {
        path: "pages/view/:id",
        element: (
          <ProtectedRoutes>
            <ViewPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "pages/create",
        element: (
          <ProtectedRoutes>
            <CreatePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "pages/edit/:id",
        element: (
          <ProtectedRoutes>
            <EditPage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
