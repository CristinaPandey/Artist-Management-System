import { useEffect } from "react";
import { Box } from "@mui/material";
// import { jwtDecode } from "jwt-decode";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import BreadCrumbs from "../components/Breadcrumbs/Breadcrumbs";

type decodedJWt = {
  iat: number;
  exp: number;
};

export default function PrivateLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const isTokenExpired = (token: string): boolean => {
    try {
      const payload: decodedJWt = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/", { replace: true });
    }
  }, [navigate, token]);

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
