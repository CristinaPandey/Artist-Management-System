// import { Box } from "@mui/material";
// import Divider from "@mui/material/Divider";

// export default function Dashboard() {
//   return (
//     <>
//       <Box
//         sx={{
//           pr: { md: 3, lg: 0, xl: 0 },
//           width: { md: "110%", lg: "115%", xl: "120%" },
//           maxWidth: "1900px",
//         }}
//       >
//         <Divider />

//         <Box
//           sx={{
//             display: "grid",
//             mt: 3,
//             gridTemplateColumns: {
//               xs: "1fr",
//               md: "repeat(2, 1fr)",
//               lg: "repeat(3, 1fr)",
//               xl: "repeat(3, 1fr)",
//               xxl: "repeat(4, 1fr)",
//             },
//             gap: 3,
//           }}
//         ></Box>
//       </Box>
//     </>
//   );
// }

// src/pages/Dashboard.tsx
import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Divider,
  Paper,
} from "@mui/material";
import {
  Person as PersonIcon,
  MusicNote as MusicNoteIcon,
  PeopleAlt as PeopleAltIcon,
} from "@mui/icons-material";
import { useAuth } from "../store/authContext";
import { ROLES } from "../constants/roles";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Users",
      value: 12,
      icon: <PeopleAltIcon sx={{ fontSize: 40 }} color="primary" />,
      roles: [ROLES.SUPER_ADMIN],
    },
    {
      title: "Artists",
      value: 24,
      icon: <PersonIcon sx={{ fontSize: 40 }} color="secondary" />,
      roles: [ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER],
    },
    {
      title: "Songs",
      value: 87,
      icon: <MusicNoteIcon sx={{ fontSize: 40 }} color="success" />,
      roles: [ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER, ROLES.ARTIST],
    },
  ];

  // const hasPermission = (roles: string[]) => {
  //   if (!user) return false;
  //   return roles.includes(user.role);
  // };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Welcome back, 1234
        {/* {user?.username}! */}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {stats.map((stat, index) => (
          // hasPermission(stat.roles) && (
          // <Grid  item xs={12} sm={6} md={4} key={index}>
          <Grid key={index} sx={{ width: { xs: 12, sm: 6, md: 4 } }}>
            <Card sx={{ height: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h5" component="div">
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.title}
                  </Typography>
                </Box>
                <Box>{stat.icon}</Box>
              </CardContent>
            </Card>
          </Grid>
          // )
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid
        // item xs={12} md={6}
        >
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                No recent activities to display
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid
        // item xs={12} md={6}
        >
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              System Overview
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                <strong>Role:</strong> user role
                {/* {user?.role} */}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Access Level:</strong>{" "}
                {/* {user?.role === ROLES.SUPER_ADMIN 
                  ? 'Full Access' 
                  : user?.role === ROLES.ARTIST_MANAGER 
                    ? 'Artist Management' 
                    : 'Songs Management'
                } */}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              You can manage content based on your access level. Navigate
              through the sidebar menu to access different sections.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
