import React, { useState, useEffect } from "react";
import { Typography, Breadcrumbs, useTheme, Button, Box } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { useNavStore } from "../../store/NavbarStore";

export default function BreadCrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathNames = location.pathname.split("/").filter((x) => x);
  const theme = useTheme();
  const activeBreadcrumbLabel = useNavStore(
    (state: any) => state.activeBreadcrumbLabel
  );

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Box
        component="section"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: { sm: "100%", lg: "115%", md: "110%", xl: "120%" },
          maxWidth: "1900px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            sx={{
              height: "32px",
              width: "32px",
              minWidth: "32px",
              borderRadius: "50%",
              border: "1px solid #C4C6CF",
            }}
            onClick={() => navigate(-1)}
          >
            {/* <ArrowBackIcon sx={{ color: theme.palette.primary[1000] }} /> */}
          </Button>

          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{
              "& .MuiBreadcrumbs-separator": {
                margin: 0,
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",
                color: theme.palette.secondary.darkGrey,
              }}
            >
              {activeBreadcrumbLabel}
            </Typography>
            {pathNames?.map((name) => {
              const words = name.split(/[-_]/).map((word) => {
                if (word === "sip") {
                  return word.toUpperCase();
                } else {
                  return word.charAt(0).toUpperCase() + word.slice(1);
                }
              });

              return (
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color: theme.palette.secondary.darkmainColor,
                  }}
                  key={name}
                >
                  {words.join(" ")}
                </Typography>
              );
            })}
          </Breadcrumbs>
        </Box>
      </Box>
    </>
  );
}
