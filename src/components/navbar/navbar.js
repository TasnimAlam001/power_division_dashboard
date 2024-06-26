"use client";

import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {  
  styled,
  useTheme,
} from "@mui/material/styles";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useMemo, useState } from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import Profile from "../profile/profile";
import { useDarkMode } from "../DarkModeProvider/DarkModeProvider";



const data = [
  { id: 1, icon: <FaUser />, label: "Executive", route: "/" },
  // {
  //   id: 2,
  //   icon: <RiLightbulbFlashFill />,
  //   label: "Utilities",
  //   route: "utility",
  // },
  // { id: 3, icon: <FaMapMarkerAlt />, label: "Zone", route: "zone" },
  // { id: 4, icon: <TbBulbFilled />, label: "S & D List", route: "executive" },
  { id: 5, icon: <FaUsers />, label: "Users", route: "user" },
  { id: 6, icon: <GiWallet />, label: "All Tickets", route: "allTickets" },
];

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 30,
    height: 30,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const drawerWidth = 200;

export default function Navbar(props) {
  const {toggleMode, currentMode} = props;
  const theme = useTheme();
  const [isLogin, setIsLogin] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const {isDarkMode, toggleDarkMode} = useDarkMode();
  console.log(isDarkMode)

  React.useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token) {
      setIsLogin(true);
    }    
  }, []);

  

  

  // let localStorageTheme = prefersDarkMode;

  // if (typeof window !== "undefined") {
  //   localStorageTheme = localStorage.getItem("mode");
  // }

  // const [dark, setDark] = React.useState(() => {
  //   return prefersDarkMode;
  // });
  // const [dark, setDark] = useState("light");
  // const localStorageTheme =  localStorage.getItem("mode");

  // useEffect(() => {
  //   const mode = localStorage.getItem("mode");
  //   // set mode
  //   // console.log(`get localStore ${mode}`);
  //   if(mode !== dark){
  //     setDark(mode  === "true");
  //   }
  // }, [dark]);

  // const [dark, setDark] = useState(() => {
  //   return localStorageTheme ? localStorageTheme === "dark" : prefersDarkMode;
  // });

  // const [dark, setDark] = React.useState(() => {
  //   if (typeof window !== "undefined") {
  //     const localStorageTheme = localStorage.getItem("mode");
  //     return localStorageTheme ? localStorageTheme === "dark" : prefersDarkMode;
  //   }
  //   return false; // Default value if window is not defined
  // });

  // Update local storage when theme mode changes
  // useEffect(() => {
  //   const localStorageMode = localStorage.getItem("mode");
  //   // setLocalStorageTheme(localStorageMode)
  //   const localStorageDark = localStorageMode === "dark";

  //   if (dark !== localStorageDark) {
  //     localStorage.setItem("mode", dark ? "dark" : "light");
  //     // Reload the page only if the localStorage mode and current state are different
  //     if (localStorageDark !== null) {
  //       window.location.reload();
  //     }
  //   }
  // }, [dark]);



  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  function toggleFullScreen() {
    // Check if fullscreen mode is currently active
    if (!document.fullscreenElement) {
      // If not active, enter fullscreen mode
      document.documentElement.requestFullscreen();
    } else {
      // If active, exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  const drawer = (
    <div>
      <Link href="/dashboard">
        <Stack direction="row" height={70} pl={2} pt={4}>
          <Image
            src="/logo2.png"
            width={50}
            height={50}
            // className="w-[70px] pl-4"
            alt="ministry of power energy and mineral resources bangladesh logo"
          ></Image>
          <Typography variant="caption" pl={1} component="h6">
            Ministry of Power Energy & Mineral Resources
          </Typography>
        </Stack>
      </Link>
      <Toolbar />

      <List
        sx={{
          pl: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {data.map((item) => (
            <Link key={item.label} href={`/dashboard/${item.route}`}>
              <ListItemButton sx={{ py: 0, minHeight: 38 }}>
                <ListItemIcon sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{ ml: -2 }}
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 13,
                    fontWeight: "medium",
                  }}
                />
              </ListItemButton>
            </Link>
          ))}
        </Box>
        {/* <Box>
          {isLogin ? (
            <ListItemButton
              onClick={handleLogOut}
              sx={{ py: 0, minHeight: 38 }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <FaSignOutAlt />
              </ListItemIcon>
              <ListItemText
                sx={{ ml: -2 }}
                primary="Log out"
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: "medium",
                }}
              />
            </ListItemButton>
          ) : (
            <ListItemButton
              onClick={() => signIn()}
              sx={{ py: 0, minHeight: 38 }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <FaSignOutAlt />
              </ListItemIcon>
              <ListItemText
                sx={{ ml: -2 }}
                primary="Login"
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: "medium",
                }}
              />
            </ListItemButton>
          )}
        </Box> */}
      </List>
    </div>
  );
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          {/* --------------------------------------------------nav------------------------------ */}
          <AppBar
            color="inherit"
            variant="none"
            // position="fixed"
            sx={{
              width: { md: `calc(100% - ${drawerWidth}px)` },
              ml: { md: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center">
                  <FormatAlignLeftIcon
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: "none" } }}
                  />

                  {/* <TextField
                  sx={{ ml: 4, display: { xs: "none", md: "block" } }}
                  placeholder="Search.."
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {" "}
                        <FaSearch />
                      </InputAdornment>
                    ),
                  }}
                /> */}
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}
                >
                  <Typography
                    lineHeight={0}
                    gutterBottom={false}
                    sx={{
                      cursor: "pointer",

                      padding: "7px",
                      transition: "background-color ",
                      "&:hover": {
                        backgroundColor: "#e1e1e3",
                        borderRadius: "100%",
                      },
                    }}
                  >
                    <SettingsOverscanIcon onClick={toggleFullScreen} />
                  </Typography>
                  <Typography
                    lineHeight={0}
                    gutterBottom={false}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <MaterialUISwitch checked={isDarkMode} onClick={toggleDarkMode} />
                                 
                  </Typography>
                  {/* TODO : check isLogin as in middleware */}
                  {isLogin ? <Profile /> : <Button>SignIn</Button>}
                </Stack>
              </Stack>
            </Toolbar>
            <Divider />
          </AppBar>
          {/* ------------------------------------------side drawer------------------------------- */}

          <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </DrawerHeader>
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", md: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>

          {/* <Box
            px={{ xs: 2, md: 4 }}
            component="main"
            sx={{ flexGrow: 1, pt: 3 }}
          >
            <Toolbar />
            {children}
          </Box> */}
        </Box>
  );
}
