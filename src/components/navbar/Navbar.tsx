import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Avatar,
  useTheme,
  useMediaQuery,
  Chip,
  ListItemButton,
  MenuItem,
  Menu,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  MusicNote as MusicNoteIcon,
  PeopleAlt as PeopleAltIcon,
  ChevronLeft as ChevronLeftIcon,
  Notifications as NotificationsIcon,
  Refresh as RefreshIcon,
  Logout as LogoutIcon,
  MusicVideo as MusicVideoIcon,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROLES } from "../../constants/roles";

// import { useAuth } from "../store/authContext";

const Logo = () => (
  <Typography
    variant="h6"
    component="div"
    sx={{
      fontWeight: "bold",
      fontSize: 22,
      display: "flex",
      alignItems: "center",
      gap: 1,
      color: "white",
      background: "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    <MusicVideoIcon sx={{ color: "white", fontSize: 28 }} />
    ArtistMgr
  </Typography>
);

interface NavBarProps {
  open?: boolean;
  onToggleDrawer?: () => void;
  drawerWidth?: number;
}

const NavBar: React.FC<NavBarProps> = ({
  open = true,
  onToggleDrawer = () => {},
  drawerWidth = 260,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();

  // For demo purposes
  const user = {
    username: "Admin User",
    role: ROLES.SUPER_ADMIN,
  };
  // Add states for menus
  const [profileAnchorEl, setProfileAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [actionsAnchorEl, setActionsAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [selectedActivityId, setSelectedActivityId] = React.useState<
    number | null
  >(null);

  const profileOpen = Boolean(profileAnchorEl);
  const actionsOpen = Boolean(actionsAnchorEl);

  // Menu handlers
  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    handleProfileClose();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const hasPermission = (roles: string[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
      roles: [ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER, ROLES.ARTIST],
    },
    {
      title: "Artists",
      icon: <PersonIcon />,
      roles: [ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER],
      path: "/artist",
    },
    {
      title: "Songs",
      icon: <MusicNoteIcon />,
      roles: [ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER, ROLES.ARTIST],
      path: "/songs",
    },
    {
      title: "Users",
      icon: <PeopleAltIcon />,
      roles: [ROLES.SUPER_ADMIN],
      path: "/users",
    },
  ];

  const drawerContent = (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          // bgcolor: theme.palette.primary.main,
        }}
      >
        <Logo />
        {isMobile && (
          <IconButton onClick={onToggleDrawer} sx={{ color: "white" }}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>
      {/* <Divider /> */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 40,
              height: 40,
              border: "2px solid",
              borderColor: theme.palette.primary.main,
            }}
          >
            {user?.username?.[0] || "A"}
          </Avatar>
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color={theme.palette.primary.main}
            >
              {user?.username || "User"}
            </Typography>
            <Chip
              label={user?.role || "Role"}
              size="small"
              color={user?.role === ROLES.SUPER_ADMIN ? "primary" : "secondary"}
              sx={{ height: 20, fontSize: 10 }}
            />
          </Box>
        </Box>
      </Box>
      <Divider />
      <List sx={{ pt: 1, pb: 1 }}>
        {menuItems.map((item) => {
          // Skip items that user doesn't have permission for
          if (!hasPermission(item.roles)) return null;

          // Regular items (no submenu)
          return (
            <ListItem
              key={item.title}
              disablePadding
              component={Link}
              to={item.path}
              sx={{
                pl: 2,
                pr: 1,
                py: 0.5,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ListItemButton
                sx={{
                  borderRadius: 1.5,
                  mb: 0.5,
                  bgcolor: isActive(item.path)
                    ? "rgba(25, 118, 210, 0.08)"
                    : "transparent",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive(item.path)
                      ? "primary.main"
                      : "text.secondary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      color={
                        isActive(item.path) ? "primary.main" : "text.primary"
                      }
                      fontWeight={isActive(item.path) ? "medium" : "normal"}
                    >
                      {item.title}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List>
        <ListItem
          disablePadding
          sx={{
            pl: 2,
            pr: 1,
            py: 0.5,
          }}
        >
          <ListItemButton
            sx={{
              borderRadius: 1.5,
              mb: 0.5,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
            onClick={() => {
              handleLogout();
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "error.main" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" color="error">
                  Logout
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      {/* Top App Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.primary.main,
          boxShadow: 2,
          mb: 2,
          // backgroundImage: "linear-gradient(90deg, #1976d2 0%, #2196f3 100%)",
        }}
      >
        <Toolbar>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onToggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              onClick={onToggleDrawer}
              edge="start"
              sx={{ mr: 2 }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          )}

          {(!open || isMobile) && <Logo />}

          <Box sx={{ flexGrow: 1 }} />

          {/* Right-side icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="Notifications">
              <IconButton size="medium" sx={{ bgcolor: "white", boxShadow: 1 }}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh Data">
              <IconButton size="medium" sx={{ bgcolor: "white", boxShadow: 1 }}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={handleProfileClick}
                size="small"
                sx={{
                  border: "2px solid",
                  borderColor: "#fff",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 36,
                    height: 36,
                  }}
                >
                  {user?.username?.[0] || "A"}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={profileAnchorEl}
                id="account-menu"
                open={profileOpen}
                onClose={handleProfileClose}
                onClick={handleProfileClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.18))",
                    mt: 1.5,
                    borderRadius: 2,
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
                {/* <MenuItem>
                  <Avatar /> My Profile
                </MenuItem>
                <MenuItem>
                  <Avatar /> Account Settings
                </MenuItem> */}
                {/* <Divider /> */}
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onToggleDrawer}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="persistent"
          open={open}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid rgba(0, 0, 0, 0.12)",
              boxShadow: open ? "4px 0 10px rgba(0, 0, 0, 0.05)" : "none",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default NavBar;
