import { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate, Navigate } from "react-router-dom";

export default function PublicLayout() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (!accessToken) {
      navigate("/", { replace: true });
      return;
    }
  }, [accessToken, navigate]);

  return (
    <>
      {!accessToken ? (
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: { xs: "100%", lg: "100%" } }}>
            <Outlet />
          </Box>
        </Box>
      ) : (
        <Navigate to="/dashboard" replace={true} />
      )}
    </>
  );
}
