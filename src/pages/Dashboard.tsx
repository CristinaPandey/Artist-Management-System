// // import { Box } from "@mui/material";
// // import Divider from "@mui/material/Divider";

// // export default function Dashboard() {
// //   return (
// //     <>
// //       <Box
// //         sx={{
// //           pr: { md: 3, lg: 0, xl: 0 },
// //           width: { md: "110%", lg: "115%", xl: "120%" },
// //           maxWidth: "1900px",
// //         }}
// //       >
// //         <Divider />

// //         <Box
// //           sx={{
// //             display: "grid",
// //             mt: 3,
// //             gridTemplateColumns: {
// //               xs: "1fr",
// //               md: "repeat(2, 1fr)",
// //               lg: "repeat(3, 1fr)",
// //               xl: "repeat(3, 1fr)",
// //               xxl: "repeat(4, 1fr)",
// //             },
// //             gap: 3,
// //           }}
// //         ></Box>
// //       </Box>
// //     </>
// //   );
// // }

// // src/pages/Dashboard.tsx
// import React from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   CardHeader,
//   Divider,
//   Paper,
// } from "@mui/material";
// import {
//   Person as PersonIcon,
//   MusicNote as MusicNoteIcon,
//   PeopleAlt as PeopleAltIcon,
// } from "@mui/icons-material";
// import { useAuth } from "../store/authContext";
// import { ROLES } from "../constants/roles";

// const Dashboard: React.FC = () => {
//   // const { user } = useAuth();

//   const stats = [
//     {
//       title: "Total Users",
//       value: 12,
//       icon: <PeopleAltIcon sx={{ fontSize: 40 }} color="primary" />,
//       roles: [ROLES.SUPER_ADMIN],
//     },
//     {
//       title: "Artists",
//       value: 24,
//       icon: <PersonIcon sx={{ fontSize: 40 }} color="secondary" />,
//       roles: [ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER],
//     },
//     {
//       title: "Songs",
//       value: 87,
//       icon: <MusicNoteIcon sx={{ fontSize: 40 }} color="success" />,
//       roles: [ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER, ROLES.ARTIST],
//     },
//   ];

//   // const hasPermission = (roles: string[]) => {
//   //   if (!user) return false;
//   //   return roles.includes(user.role);
//   // };

//   return (
//     <Box>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Dashboard
//       </Typography>
//       <Typography variant="body1" color="text.secondary" paragraph>
//         Welcome back, 1234
//         {/* {user?.username}! */}
//       </Typography>

//       <Grid container spacing={3} sx={{ mt: 2 }}>
//         {stats.map((stat, index) => (
//           // hasPermission(stat.roles) && (
//           // <Grid  item xs={12} sm={6} md={4} key={index}>
//           <Grid key={index} sx={{ width: { xs: 12, sm: 6, md: 4 } }}>
//             <Card sx={{ height: "100%" }}>
//               <CardContent
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Box>
//                   <Typography variant="h5" component="div">
//                     {stat.value}
//                   </Typography>
//                   <Typography variant="body1" color="text.secondary">
//                     {stat.title}
//                   </Typography>
//                 </Box>
//                 <Box>{stat.icon}</Box>
//               </CardContent>
//             </Card>
//           </Grid>
//           // )
//         ))}
//       </Grid>

//       <Grid container spacing={3} sx={{ mt: 3 }}>
//         <Grid
//         // item xs={12} md={6}
//         >
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Recent Activities
//             </Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Box
//               sx={{
//                 height: 300,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Typography variant="body2" color="text.secondary">
//                 No recent activities to display
//               </Typography>
//             </Box>
//           </Paper>
//         </Grid>

//         <Grid
//         // item xs={12} md={6}
//         >
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               System Overview
//             </Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Box sx={{ mb: 2 }}>
//               <Typography variant="body2" gutterBottom>
//                 <strong>Role:</strong> user role
//                 {/* {user?.role} */}
//               </Typography>
//               <Typography variant="body2" gutterBottom>
//                 <strong>Access Level:</strong>{" "}
//                 {/* {user?.role === ROLES.SUPER_ADMIN
//                   ? 'Full Access'
//                   : user?.role === ROLES.ARTIST_MANAGER
//                     ? 'Artist Management'
//                     : 'Songs Management'
//                 } */}
//               </Typography>
//             </Box>
//             <Typography variant="body2" color="text.secondary">
//               You can manage content based on your access level. Navigate
//               through the sidebar menu to access different sections.
//             </Typography>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  // Divider,
  Paper,
  // Avatar,
  IconButton,
  Chip,
  List,
  ListItem,
  // ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Badge,
  Stack,
  LinearProgress,
  Button,
  Tooltip,
  // Menu,
  // MenuItem,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
// import ListItemIcon from "@mui/material/ListItemIcon";
import {
  Person as PersonIcon,
  MusicNote as MusicNoteIcon,
  PeopleAlt as PeopleAltIcon,
  BarChart as BarChartIcon,
  Notifications as NotificationsIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  AccessTime as AccessTimeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  // Logout as LogoutIcon,
} from "@mui/icons-material";
import { useAuth } from "../store/authContext";
import { ROLES } from "../constants/roles";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration
const recentActivities = [
  {
    id: 1,
    action: "New song added",
    user: "John Artist",
    time: "2 hours ago",
    type: "song",
  },
  {
    id: 2,
    action: "Artist profile updated",
    user: "Maria Manager",
    time: "5 hours ago",
    type: "artist",
  },
  {
    id: 3,
    action: "New user registered",
    user: "System",
    time: "Yesterday",
    type: "user",
  },
  {
    id: 4,
    action: "Song deleted",
    user: "James Singer",
    time: "2 days ago",
    type: "song",
  },
];

const topArtists = [
  { name: "Sarah Jones", songs: 12, followers: 45000 },
  { name: "Mike Stevens", songs: 8, followers: 32000 },
  { name: "Lisa Chen", songs: 15, followers: 27500 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  // const { user } = useAuth();

  // For demo purposes
  const user = {
    username: "Admin User",
    role: ROLES.SUPER_ADMIN,
  };

  // Add state for menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Menu handlers
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Your logout logic here
    navigate("/"); // Redirect to home
    handleClose(); // Close the menu
  };

  const stats = [
    {
      title: "Total Users",
      value: 12,
      icon: <PeopleAltIcon sx={{ fontSize: 40 }} color="primary" />,
      change: "+2",
      trend: "up",
      roles: [ROLES.SUPER_ADMIN],
      bgcolor: "primary.light",
      color: "primary.dark",
    },
    {
      title: "Artists",
      value: 24,
      icon: <PersonIcon sx={{ fontSize: 40 }} color="secondary" />,
      change: "+5",
      trend: "up",
      roles: [ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER],
      bgcolor: "secondary.light",
      color: "secondary.dark",
    },
    {
      title: "Songs",
      value: 87,
      icon: <MusicNoteIcon sx={{ fontSize: 40 }} color="success" />,
      change: "+12",
      trend: "up",
      roles: [ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER, ROLES.ARTIST],
      bgcolor: "success.light",
      color: "success.dark",
    },
    {
      title: "New This Week",
      value: 8,
      icon: <BarChartIcon sx={{ fontSize: 40 }} color="warning" />,
      change: "-2",
      trend: "down",
      roles: [ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER],
      bgcolor: "warning.light",
      color: "warning.dark",
    },
  ];

  const hasPermission = (roles: any) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <Box
      sx={{ p: 3, maxWidth: "100%", bgcolor: "#f5f5f7", minHeight: "100vh" }}
    >
      {/* Header with greeting */}
      <Box sx={{ mb: 4, maxWidth: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            color="text.primary"
          >
            Dashboard
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Tooltip title="Notifications">
              <IconButton size="medium">
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh Data">
              <IconButton size="medium">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton onClick={handleClick} size="small">
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {user?.username?.[0] || "A"}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {/* <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem> */}
                {/* <Divider /> */}
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {user?.username || "User"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.role || "Role"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Welcome back! Here's what's happening with your Artist Management
          System today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map(
          (stat, index) =>
            hasPermission(stat.roles) && (
              <Grid key={index}>
                <Card
                  elevation={2}
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Avatar
                        sx={{ bgcolor: stat.bgcolor, width: 56, height: 56 }}
                      >
                        {stat.icon}
                      </Avatar>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography
                          variant="h4"
                          component="div"
                          fontWeight="bold"
                        >
                          {stat.value}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          {stat.trend === "up" ? (
                            <ArrowUpwardIcon
                              fontSize="small"
                              sx={{ color: "success.main" }}
                            />
                          ) : (
                            <ArrowDownwardIcon
                              fontSize="small"
                              sx={{ color: "error.main" }}
                            />
                          )}
                          <Typography
                            variant="body2"
                            component="span"
                            sx={{
                              color:
                                stat.trend === "up"
                                  ? "success.main"
                                  : "error.main",
                              fontWeight: "medium",
                            }}
                          >
                            {stat.change}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Typography
                      variant="body1"
                      fontWeight="medium"
                      color="text.secondary"
                    >
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
        )}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activities Section */}
        <Grid>
          <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Recent Activities
              </Typography>
              <Button
                size="small"
                endIcon={<RefreshIcon />}
                sx={{ textTransform: "none" }}
              >
                Refresh
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {recentActivities.length > 0 ? (
              <List sx={{ width: "100%" }}>
                {recentActivities.map((activity) => (
                  <ListItem
                    key={activity.id}
                    sx={{
                      py: 1.5,
                      px: 2,
                      mb: 1,
                      bgcolor: "background.paper",
                      borderRadius: 1,
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                    secondaryAction={
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton edge="end" size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor:
                            activity.type === "song"
                              ? "success.light"
                              : activity.type === "artist"
                              ? "secondary.light"
                              : "primary.light",
                        }}
                      >
                        {activity.type === "song" ? (
                          <MusicNoteIcon />
                        ) : activity.type === "artist" ? (
                          <PersonIcon />
                        ) : (
                          <PeopleAltIcon />
                        )}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.action}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {activity.user}
                          </Typography>
                          {" — "}
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            <AccessTimeIcon
                              fontSize="inherit"
                              sx={{
                                fontSize: 12,
                                verticalAlign: "middle",
                                mr: 0.5,
                              }}
                            />
                            {activity.time}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box
                sx={{
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  No recent activities to display
                </Typography>
              </Box>
            )}

            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <Button
                variant="outlined"
                size="small"
                sx={{ textTransform: "none" }}
              >
                View All Activities
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* System Overview & Quick Access */}
        <Grid>
          <Stack spacing={3}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                System Overview
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    Role
                  </Typography>
                  <Chip
                    label={user?.role || "Unknown"}
                    size="small"
                    color={
                      user?.role === ROLES.SUPER_ADMIN
                        ? "primary"
                        : user?.role === ROLES.ARTIST_MANAGER
                        ? "secondary"
                        : "default"
                    }
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    Access Level
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user?.role === ROLES.SUPER_ADMIN
                      ? "Full Access"
                      : user?.role === ROLES.ARTIST_MANAGER
                      ? "Artist Management"
                      : "Songs Management"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" fontWeight="medium">
                    Last Login
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Today, 9:32 AM
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" paragraph>
                You can manage content based on your access level. Navigate
                through the sidebar menu to access different sections.
              </Typography>

              {/* Quick Access Buttons */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Quick Access
                </Typography>
                <Grid container spacing={2}>
                  {hasPermission([ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER]) && (
                    <Grid>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<PersonIcon />}
                        sx={{ textTransform: "none" }}
                      >
                        Manage Artists
                      </Button>
                    </Grid>
                  )}
                  {hasPermission([
                    ROLES.SUPER_ADMIN,
                    ROLES.ARTIST_MANAGER,
                    ROLES.ARTIST,
                  ]) && (
                    <Grid>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<MusicNoteIcon />}
                        sx={{ textTransform: "none" }}
                      >
                        Manage Songs
                      </Button>
                    </Grid>
                  )}
                  {hasPermission([ROLES.SUPER_ADMIN]) && (
                    <Grid>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<PeopleAltIcon />}
                        sx={{ textTransform: "none" }}
                      >
                        Manage Users
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Paper>

            {/* Top Artists Section - Only shown to SUPER_ADMIN and ARTIST_MANAGER */}
            {hasPermission([ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER]) && (
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Top Artists
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <List dense>
                  {topArtists.map((artist, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        py: 1,
                        px: 2,
                        mb: 1,
                        bgcolor: "background.paper",
                        borderRadius: 1,
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "secondary.light" }}>
                          {artist.name.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={artist.name}
                        secondary={`${
                          artist.songs
                        } songs · ${artist.followers.toLocaleString()} followers`}
                      />
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="text"
                    size="small"
                    sx={{ textTransform: "none" }}
                  >
                    View All Artists
                  </Button>
                </Box>
              </Paper>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
