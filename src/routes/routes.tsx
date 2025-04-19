import { lazy } from "react";
import UsersList from "../pages/Users/UsersList";
import UserForm from "../pages/Users/UserForm";
import ArtistsList from "../pages/Artists/ArtistsList";
import SongsList from "../pages/Songs/SongsList";
import UserIndex from "../pages/Users/UserIndex";

const Dashboard = lazy(() => import("./../pages/Dashboard"));

const routes = [
  {
    path: "/dashboard",
    component: <Dashboard />,
  },
  {
    path: "/users",
    component: <UserIndex />,
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
  {
    path: "/songs-list",
    component: <SongsList />,
  },
];

export default routes;
