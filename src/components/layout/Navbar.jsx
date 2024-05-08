import React , {useState} from "react";
import { AppBar, Grid, Toolbar , Button , Avatar ,Menu , MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Navbar = ({ loggedIn, onLogout , firstName}) => {
  
  const avatarStyle = {
    cursor: 'pointer'
  }
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null)


  const handleLogOut = () => {
    onLogout();
    navigate("/login");
  };

  const handleLogIn = () => {
    navigate("/login");
  };
  const handleNext = () => {
    navigate('/signup')
  }
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };  
  const handleProfile = () => {
    navigate('/profile')
  }
  return (
    <AppBar position="fixed" sx={{ width: "100%", top: 0 }}>
      <Toolbar sx={{justifyContent: "space-between"}}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
          {loggedIn ? (
            <Button variant="text" component ={Link} to = '/' color="inherit">
              Home
            </Button>
          ) : (
            <Button variant="contained" onClick={handleLogIn}>
              Signin
            </Button>
          )}
          {loggedIn ? (
            <Button> 
            </Button>
          ):(
            <Button variant= "contained"onClick={handleNext}>Register</Button>
          )}
          </Grid>
        
        <Grid item>
        <Button variant="text" component ={Link} to = '/trackorder' color="inherit">
              Track Order
            </Button>
          </Grid>
         {loggedIn ? ( <Grid item>
            <Avatar sx={avatarStyle} alt={firstName} src="avatar.png" onClick = {handleAvatarClick} /> 
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </Menu>
          </Grid>
         ) : (
          <Avatar /> 
         )}
          </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;