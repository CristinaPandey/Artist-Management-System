import { lazy } from "react";
import UsersList from "../pages/Users/UsersList";
import UserForm from "../pages/Users/UserForm";
import ArtistsList from "../pages/Artists/ArtistsList";

const Dashboard = lazy(() => import("./../pages/Dashboard"));

const routes = [
  {
    path: "/dashboard",
    component: <Dashboard />,
  },
  {
    path: "/users-list",
    component: <UsersList />,
  },
  // {
  //   path: "/users-form",
  //   component: <UserForm />,
  // },
  {
    path: "/artist-list",
    component: <ArtistsList />,
  },
  // {
  //   path: "/artist-import-export",
  //   component: <ArtistImportExport />,
  // },
];

export default routes;
