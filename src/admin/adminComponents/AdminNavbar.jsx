import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Badge,
  Switch as ToggleSwitch
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Message as MessageIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import '../../assets/css/main.css';
import { logoutUser } from '../../helper/helper';

const AdminAppBar = ({ toggleDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;

  const handleToggleDarkMode = () => {
    const newMode = !darkMode;
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    window.location.reload();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser()
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#182B3E' }}>
      <Toolbar>
        <IconButton
          sx={{marginLeft: "220px" , marginRight: "20px"}}
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src="/genius.jpeg" alt="Logo" style={{ height: '40px', verticalAlign: 'middle', marginRight: '10px',backgroundColor:"#182B3Ee" }} />
        </Typography>
        <ToggleSwitch
            sx={{width: "63px"}}
            checked={darkMode}
            onChange={handleToggleDarkMode}
          />
        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <Badge badgeContent={3} color="error">
            <MessageIcon />
          </Badge>
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          <IconButton sx={{width: "100px"}} color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
          <Menu

            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ mt: '2px' }}
          >
            <MenuItem component={Link} to="/admin/profile" onClick={handleMenuClose}>
              My Profile
            </MenuItem>
            <MenuItem component={Link} to="/admin/settings" onClick={handleMenuClose}>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Logout
              <LogoutIcon sx={{ marginLeft: '10px' }} />
            </MenuItem>
          </Menu>
      
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminAppBar;
