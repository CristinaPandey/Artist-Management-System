import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";

import PrivateLayout from "../layout/PrivateLayout";
import SpinningLoader from "../components/SpinningLoader/SpinningLoader";
import PublicLayout from "../layout/PublicLayout";
import routes from "./routes";

export default function MainRoutes() {
  return (
    <>
      <Routes>
        <Route element={<PrivateLayout />}>
          {routes.map((item: any, index: number) => (
            <Route
              key={index}
              path={item.path}
              element={
                <Suspense fallback={<SpinningLoader />}>
                  {item.component}
                </Suspense>
              }
            />
          ))}
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Login />} />
          {/* <Route path="/register" element={<Login />} /> */}
        </Route>
      </Routes>
    </>
  );
}
