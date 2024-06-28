import React, { useState, useEffect } from "react";
import {
  AppBar,
  Grid,
  Toolbar,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Switch,
  Typography,
  Link
} from "@mui/material";
import {Link as link , useNavigate } from "react-router-dom";
import { Brightness4, Brightness7, AccountCircle } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomButton from "../Buttons/Button";
import Search from "../features/Search";
import CartIcon from "../features/CartIcon";
import "../../../assets/css/main.css";
import { config } from "../../../helper/config";
import baseApi from "../../../apibase-endpoint/apiBase";
import { userEnd } from "../../../apibase-endpoint/apiEndpoint";

const Navbar = ({ loggedIn, onLogout, onToggleDarkMode, token }) => {
  const avatarStyle = {
    cursor: "pointer",
  };
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseApi({ apiDetails: userEnd.profile });
        if (response.status === 200) {
          setProfilePic(response.data.user_detail.profile_image);
        }
      } catch (error) {
        console.error("Failed to fetch profile picture:", error);
      }
    };

    if (token && token !== "undefined" && token !== null) {
      fetchData();
    }
  }, [token]);

  const handleLogOut = () => {
    window.location.reload()
    onLogout();
    setAnchorEl(null);
  };

  const handleLogIn = () => {
    navigate("/login");
    handleClose();
  };


  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
    document.body.classList.add("overflow-auto");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  const handleToggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    onToggleDarkMode();
    window.location.reload(); // Reload the window after toggling dark mode
  };

  return (
    <AppBar
      position="fixed"
      sx={{ bgcolor: "#182B3E", width: "100%", top: 0 }}
      className="overflow-auto"
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
           
                <Grid item>
                  <img
                    src="/shopify.png"
                    style={{
                      height: "30px",
                      marginTop: "20px",
                      marginLeft: "70px",
                    }}
                  />
                </Grid>
                <CustomButton type="home" />

          </Grid>
          <Grid item>
            <Search />
          </Grid>
          <Grid item>
            <Button
              sx={{ fontSize: 12, fontWeight: "bold" }}
              variant="text"
              component={link}
              to="/trackorder"
              color="inherit"
            >
              Track Order
            </Button>
          </Grid>
          <Grid item>
            <CartIcon />
          </Grid>
          {loggedIn ? (
            <Grid item>
              <Avatar
                sx={avatarStyle}
                src={config.baseUrl + profilePic}
                onClick={handleAvatarClick}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{ sx: { paddingTop: 0, paddingBottom: 0 } }}
              >
                <MenuItem
                  onClick={handleProfile}
                  className={darkMode ? "dark-menu-item" : ""}
                >
                  <AccountCircle />
                  Profile
                </MenuItem>
                <MenuItem className={darkMode ? "dark-menu-item" : ""}>
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                  <Switch
                    checked={darkMode}
                    onChange={handleToggleDarkMode}
                  />
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </MenuItem>
                <MenuItem
                  onClick={handleLogOut}
                  className={darkMode ? "dark-menu-item" : ""}
                >
                  <LogoutIcon />
                  Logout
                </MenuItem>
              </Menu>
            </Grid>
          ) : <Grid item>
          <Button onClick={handleAvatarClick} sx={{ color: "white" }}>
            Hello, sign in
          </Button>
          <Menu
            sx={{mr: 20}}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{ sx: { width: '190px', paddingTop: 0, paddingBottom: 0 } }}
          >
              <Button
                onClick={handleLogIn}
                variant="contained"
                sx={{ ml: 1, mt: 1, bgcolor: "#FFD814", color: "black" }}
              >
                Sign In
              </Button>
              <MenuItem>
              <Typography sx={{ mr: 1 ,cursor: 'auto'}} variant="body2">
                New customer?{" "}
                </Typography>
                <Link
                  sx={{ml: -1}}
                  href="/signup"
                  variant="body2"
                  underline="none"
                >
                  Start here
                </Link>
                </MenuItem>
          </Menu>
        </Grid>
           }
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
