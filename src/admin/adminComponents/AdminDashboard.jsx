import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Avatar,
  Box,
} from '@mui/material';
import {
  Home as HomeIcon,
  ShoppingCart as ShoppingCartIcon,
  Assignment as AssignmentIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import '../../assets/css/main.css';
import AdminAppBar from './AdminNavbar';
import baseApi from '../../apibase-endpoint/apiBase';
import { userEnd } from '../../apibase-endpoint/apiEndpoint';
import { config } from '../../helper/config';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const { firstName, lastName, loggedIn } = useSelector((state) => state.UserDetails);
  const [selectedItem, setSelectedItem] = useState('');
  const [profilePic, setProfilePic] = useState();

  useEffect(() => {
    const fetchProfilePic = async () => {
      const response = await baseApi({ apiDetails: userEnd.profile });
      if (response.status === 200) {
        setProfilePic(response.data.user_detail.profile_image);
      }
    };

    fetchProfilePic();
  }, []);

  const handleListItemClick = (item) => {
    setSelectedItem(item);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <CssBaseline />
      <AdminAppBar toggleDrawer={toggleDrawer} />
      <Drawer
        variant="persistent"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            backgroundColor: '#182B3E',
            color: 'white',
          },
        }}
      >
        <List>
          <ListItem sx={{ bottom: 7, height: "100px", marginBottom: "30px", bgcolor: "#214162" }}>
            <ListItemIcon>
              <Avatar
                sx={{ marginRight: "10px", height: "70px", width: "70px", cursor: "pointer", bgcolor: "#333" }}
                onClick={() => navigate('/admin/profile')}
                alt={`${firstName}`}
                src={config.baseUrl + profilePic}
              />
            </ListItemIcon>
            <Box>
              <ListItemText sx={{ color: "#D2D5D9" }} primary={`${firstName} ${lastName}`} />
              {loggedIn && (
                <Box display="flex" alignItems="center" mt={1}>
                  <Box className="blinking-dot" />
                  <Box sx={{ color: '#1ED085', marginLeft: "5px" }}>Online</Box>
                </Box>
              )}
            </Box>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/admin"
            selected={selectedItem === 'Home'}
            onClick={() => handleListItemClick('Home')}
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#214162',
                color: '#D2D5D9',
              },
            }}
          >
            <ListItemIcon>
              <HomeIcon sx={{ color: "aqua" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#D2D5D9" }} primary="Home" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/admin/view"
            selected={selectedItem === 'Products'}
            onClick={() => handleListItemClick('Products')}
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#214162',
                color: '#D2D5D9',
              },
            }}
          >
            <ListItemIcon>
              <ShoppingCartIcon sx={{ color: "orange" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#D2D5D9" }} primary="Products" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/admin/orders"
            selected={selectedItem === 'Orders'}
            onClick={() => handleListItemClick('Orders')}
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#214162',
                color: '#D2D5D9',
              },
            }}
          >
            <ListItemIcon>
              <AssignmentIcon sx={{ color: "purple" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#D2D5D9" }} primary="Orders" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/admin/settings"
            selected={selectedItem === 'Settings'}
            onClick={() => handleListItemClick('Settings')}
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#214162',
                color: '#D2D5D9',
              },
            }}
          >
            <ListItemIcon>
              <SettingsIcon sx={{ color: "#607D8B" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#D2D5D9" }} primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default AdminDashboard;
