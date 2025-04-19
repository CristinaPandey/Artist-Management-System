import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Badge,
  Stack,
  Button,
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  useTheme,
  useMediaQuery,
} from "@mui/material";
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
  Refresh as RefreshIcon,
  Logout as LogoutIcon,
  Launch as LaunchIcon,
  MoreVert as MoreVertIcon,
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  Delete,
  Edit,
} from "@mui/icons-material";
import { useAuth } from "../store/authContext";
import { ROLES } from "../constants/roles";
import { useLocation, useNavigate } from "react-router-dom";

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
  {
    name: "Sarah Jones",
    songs: 12,
    followers: 45000,
    trend: "up",
    change: "+12%",
  },
  {
    name: "Mike Stevens",
    songs: 8,
    followers: 32000,
    trend: "up",
    change: "+8%",
  },
  {
    name: "Lisa Chen",
    songs: 15,
    followers: 27500,
    trend: "down",
    change: "-3%",
  },
];

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { user } = useAuth();

  // For demo purposes
  const user = {
    username: "Admin User",
    role: ROLES.SUPER_ADMIN,
  };

  const [actionsAnchorEl, setActionsAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [selectedActivityId, setSelectedActivityId] = React.useState<
    number | null
  >(null);

  const actionsOpen = Boolean(actionsAnchorEl);

  const handleActionsClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    setSelectedActivityId(id);
    setActionsAnchorEl(event.currentTarget);
  };

  const handleActionsClose = () => {
    setActionsAnchorEl(null);
    setSelectedActivityId(null);
  };

  const stats = [
    {
      title: "Total Users",
      value: 12,
      icon: <PeopleAltIcon sx={{ fontSize: 32 }} />,
      change: "+2",
      trend: "up",
      roles: [ROLES.SUPER_ADMIN],
      bgcolor: "primary.main",
      color: "white",
    },
    {
      title: "Artists",
      value: 24,
      icon: <PersonIcon sx={{ fontSize: 32 }} />,
      change: "+5",
      trend: "up",
      roles: [ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER],
      bgcolor: "secondary.main",
      color: "white",
    },
    {
      title: "Songs",
      value: 87,
      icon: <MusicNoteIcon sx={{ fontSize: 32 }} />,
      change: "+12",
      trend: "up",
      roles: [ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER, ROLES.ARTIST],
      bgcolor: "#4caf50",
      color: "white",
    },
    {
      title: "New This Week",
      value: 8,
      icon: <BarChartIcon sx={{ fontSize: 32 }} />,
      change: "-2",
      trend: "down",
      roles: [ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER],
      bgcolor: "#ff9800",
      color: "white",
    },
  ];

  const hasPermission = (roles: any) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "success.main" : "error.main";
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <ArrowUpwardIcon fontSize="small" sx={{ color: "success.main" }} />
    ) : (
      <ArrowDownwardIcon fontSize="small" sx={{ color: "error.main" }} />
    );
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        bgcolor: "#f7f9fc",
        width: { sm: "100%", md: "100%", lg: "100%" },
        // minHeight: "100vh",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              component="h1"
              fontWeight="bold"
              color="text.primary"
              sx={{
                background: "linear-gradient(90deg, #2c3e50 0%, #4b6cb7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Welcome back! Here's your Artist Management System overview.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map(
          (stat, index) =>
            hasPermission(stat.roles) && (
              <Grid key={index}>
                <Card
                  elevation={2}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    overflow: "hidden",
                    position: "relative",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 8,
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "5px",
                      bgcolor: stat.bgcolor,
                    }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: stat.bgcolor,
                          color: stat.color,
                          width: 52,
                          height: 52,
                          boxShadow: 2,
                        }}
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
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              height: "100%",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AnalyticsIcon color="primary" />
                Recent Activities
              </Typography>
              <Button
                size="small"
                variant="contained"
                endIcon={<RefreshIcon />}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: 1,
                }}
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
                      mb: 1.5,
                      bgcolor: "background.paper",
                      borderRadius: 2,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "action.hover",
                        transform: "translateX(4px)",
                      },
                    }}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={(e) => handleActionsClick(e, activity.id)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor:
                            activity.type === "song"
                              ? "#4caf50"
                              : activity.type === "artist"
                              ? "secondary.main"
                              : "primary.main",
                          color: "white",
                          boxShadow: 1,
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
                      primary={
                        <Typography variant="subtitle2" fontWeight="medium">
                          {activity.action}
                        </Typography>
                      }
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

            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
              <Button
                variant="outlined"
                size="medium"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  px: 3,
                }}
              >
                View All Activities
              </Button>
            </Box>

            <Menu
              anchorEl={actionsAnchorEl}
              open={actionsOpen}
              onClose={handleActionsClose}
              PaperProps={{
                elevation: 3,
                sx: {
                  borderRadius: 2,
                  minWidth: 150,
                },
              }}
            >
              <MenuItem onClick={handleActionsClose}>
                <ListItemIcon>
                  <LaunchIcon fontSize="small" />
                </ListItemIcon>
                View Details
              </MenuItem>
              <MenuItem onClick={handleActionsClose}>
                <ListItemIcon>
                  <Edit fontSize="small" />
                </ListItemIcon>
                Edit
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleActionsClose}
                sx={{ color: "error.main" }}
              >
                <ListItemIcon>
                  <Delete fontSize="small" color="error" />
                </ListItemIcon>
                Delete
              </MenuItem>
            </Menu>
          </Paper>
        </Grid>

        {/* System Overview & Quick Access */}
        <Grid>
          <Stack spacing={3}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <DashboardIcon color="primary" />
                System Overview
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                    alignItems: "center",
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
                    sx={{
                      fontWeight: "medium",
                      borderRadius: "16px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    Access Level
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      bgcolor: "rgba(0,0,0,0.04)",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                    }}
                  >
                    {user?.role === ROLES.SUPER_ADMIN
                      ? "Full Access"
                      : user?.role === ROLES.ARTIST_MANAGER
                      ? "Artist Management"
                      : "Songs Management"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    Last Login
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <AccessTimeIcon fontSize="inherit" />
                    Today, 9:32 AM
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                paragraph
                sx={{
                  bgcolor: "primary.light",
                  p: 1.5,
                  borderRadius: 2,
                  borderLeft: "4px solid",
                  borderColor: "primary.main",
                }}
              >
                You can manage content based on your access level. Navigate
                through the sidebar menu to access different sections.
              </Typography>

              {/* Quick Access Buttons */}
              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 1.5,
                  }}
                >
                  Quick Access
                </Typography>
                <Grid container spacing={2}>
                  {hasPermission([ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER]) && (
                    <Grid>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<PersonIcon />}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          bgcolor: "secondary.main",
                          py: 1,
                        }}
                        onClick={() => navigate("/artist")}
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
                        variant="contained"
                        fullWidth
                        startIcon={<MusicNoteIcon />}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          bgcolor: "#4caf50",
                          py: 1,
                        }}
                        onClick={() => navigate("/songs")}
                      >
                        Manage Songs
                      </Button>
                    </Grid>
                  )}
                  {hasPermission([ROLES.SUPER_ADMIN]) && (
                    <Grid>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<PeopleAltIcon />}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          py: 1,
                        }}
                        onClick={() => navigate("/users")}
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
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <PersonIcon color="secondary" />
                  Top Artists
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <List disablePadding>
                  {topArtists.map((artist, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        py: 1.5,
                        px: 2,
                        mb: 1.5,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        transition: "all 0.2s",
                        "&:hover": {
                          bgcolor: "action.hover",
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: "secondary.main",
                            boxShadow: 1,
                          }}
                        >
                          {artist.name.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" fontWeight="medium">
                            {artist.name}
                          </Typography>
                        }
                        secondary={`${
                          artist.songs
                        } songs · ${artist.followers.toLocaleString()} followers`}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          ml: 1,
                        }}
                      >
                        {getTrendIcon(artist.trend)}
                        <Typography
                          variant="caption"
                          sx={{
                            color: getTrendColor(artist.trend),
                            fontWeight: "medium",
                          }}
                        >
                          {artist.change}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="outlined"
                    size="medium"
                    color="secondary"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      px: 3,
                    }}
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
