import { lazy } from "react";

import SongsList from "../pages/Songs/SongsList";

import UsersList from "../pages/Users/UsersList";
import ArtistsList from "../pages/Artists/ArtistsList";

const Dashboard = lazy(() => import("./../pages/Dashboard"));

const routes = [
  {
    path: "/dashboard",
    component: <Dashboard />,
  },
  {
    path: "/users",
    component: <UsersList />,
  },

  {
    path: "/artist",
    component: <ArtistsList />,
  },

  {
    path: "/songs",
    component: <SongsList />,
  },
];

export default routes;
