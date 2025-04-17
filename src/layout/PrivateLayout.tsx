import { useEffect } from "react";
import { Box } from "@mui/material";
// import { jwtDecode } from "jwt-decode";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import BreadCrumbs from "../components/Breadcrumbs/Breadcrumbs";
// import { usePostGenerateAccessToken } from "services/Auth/AuthServices.tsx";

type decodedJWt = {
  iat: number;
  exp: number;
};

export default function PrivateLayout() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  // const { mutate: generateAccessToken } = usePostGenerateAccessToken();

  // useEffect(() => {
  //   if (access_token) {
  //     try {
  //       const decodedToken: decodedJWt = jwtDecode(access_token);
  //       const expirationTime = decodedToken.exp * 1000;
  //       const currentTime = Date.now();
  //       const timeUntilExpiration = expirationTime - currentTime;
  //       const tokenThreshold = 2 * 60 * 1000;
  //       if (timeUntilExpiration > tokenThreshold) {
  //         setTimeout(() => {
  //           if (refreshToken) {
  //             generateAccessToken(
  //               { refresh_token: refreshToken },
  //               {
  //                 onError: () => {
  //                   localStorage.removeItem("access_token");
  //                   localStorage.removeItem("refresh_token");
  //                   navigate("/", { replace: true });
  //                 },
  //               }
  //             );
  //           }
  //         }, timeUntilExpiration - tokenThreshold);
  //       } else {
  //         localStorage.removeItem("access_token");
  //         localStorage.removeItem("refresh_token");
  //         navigate("/", { replace: true });
  //       }
  //     } catch (error) {
  //       // console.error("Error decoding token:", error);
  //     }
  //   } else {
  //     localStorage.removeItem("access_token");
  //     navigate("/", { replace: true });
  //   }
  // }, [access_token, navigate, refreshToken, generateAccessToken]);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Box sx={{ p: "20px 26px", width: { xs: "70%", lg: "70%" } }}>
        <BreadCrumbs />
        <Outlet />
      </Box>
    </Box>
  );
}
