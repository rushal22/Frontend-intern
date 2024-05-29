// src/components/shared/layout/NavbarContainer.jsx

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
  styled,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Brightness4, Brightness7, AccountCircle } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomButton from "../Buttons/Button";
import Search from "../features/Search";
import CartIcon from "../features/CartIcon";



const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor:
      localStorage.getItem("darkMode") === "true"
        ? theme.palette.grey[900]
        : theme.palette.background.default,
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    minWidth: "200px",
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor:
      localStorage.getItem("darkMode") === "true"
        ? theme.palette.grey[900]
        : theme.palette.background.default,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
    marginRight: theme.spacing(1.5),
  },
  "& .MuiTypography-root": {
    fontWeight: 500,
  },
  backgroundColor:
    localStorage.getItem("darkMode") === "true"
      ? theme.palette.grey[900]
      : theme.palette.background.default,
  color:
    localStorage.getItem("darkMode") === "true"
      ? theme.palette.grey[300]
      : theme.palette.text.primary,
}));

const Navbar = ({ loggedIn, onLogout, firstName, onToggleDarkMode }) => {
  const avatarStyle = {
    cursor: "pointer",
  };
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );


  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const handleLogOut = () => {
    onLogout();
    setAnchorEl(null);
    navigate("/login");
  };

  const handleLogIn = () => {
    navigate("/login");
    handleClose();
  };

  const handleNext = () => {
    navigate("/signup");
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
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
  };

  return (
    <AppBar position="fixed" sx={{ width: "100%", top: 0 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            {loggedIn ? (
              <CustomButton type="home" />
            ) : (
              <>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Grid item>
                    <CustomButton type="login" onClick={handleLogIn} />
                  </Grid>
                  <Grid item>
                    <CustomButton type="register" onClick={handleNext} />
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
          <Grid item>
            <Search />
          </Grid>
          <Grid item>
            <Button
              sx={{ fontSize: 12 }}
              variant="text"
              component={Link}
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
                alt={firstName}
                src="avatar.png"
                onClick={handleAvatarClick}
              />
              <StyledMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <StyledMenuItem onClick={handleProfile}>
                  <AccountCircle />
                  Profile
                </StyledMenuItem>
                <StyledMenuItem>
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                  <Switch checked={darkMode} onChange={handleToggleDarkMode} />
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </StyledMenuItem>
                <StyledMenuItem onClick={handleLogOut}>
                  <LogoutIcon />
                  Logout
                </StyledMenuItem>
              </StyledMenu>
            </Grid>
          ) : (
           null
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
