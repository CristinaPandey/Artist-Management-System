import { lazy } from "react";

import SongsList from "../pages/Songs/SongsList";
import UserIndex from "../pages/Users/UserIndex";
import ArtistIndex from "../pages/Artists/ArtistIndex";

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
