import { lazy } from "react";

import SongsList from "../pages/Songs/SongsList";
import ArtistIndex from "../pages/Artists/ArtistIndex";
import UsersList from "../pages/Users/UsersList";

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
    component: <ArtistIndex />,
  },

  {
    path: "/songs",
    component: <SongsList />,
  },
];

export default routes;
