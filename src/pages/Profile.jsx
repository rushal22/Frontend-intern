import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";

const ProfileContainer = styled(Container)({
  marginTop: "2rem",
});

const Profile = () => {
  const firstName = useSelector((state) => state.UserDetails.firstName);
  const lastName = useSelector((state) => state.UserDetails.lastName);
  const [profilePic, setProfilePic] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
  });

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(URL.createObjectURL(file));
  };

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    setEditMode(false);
  };

  return (
    <ProfileContainer 
    component="main"
     maxWidth="xs"
     >
      <CssBaseline />
      <div>
        <Avatar
          alt="Profile Picture"
          src={profilePic}
          sx={{ width: 100, height: 100, margin: "auto", marginTop: 10 }}
        />
        {editMode ? (
          <>
          <Typography component="h1" variant="h5" align="center">
              Edit Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              style={{ margin: "auto", marginTop: 10, display: "block" }}
              />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="profile-textfield"
              InputProps={{ style: { borderColor: 'red' } }}
               />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="profile-textfield"
              InputProps={{ style: { borderColor: 'red' } }}
              />
        
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Save Changes
            </Button>
          </form>
              </>
        ) : (
          <>
            
            <Grid container spacing={2}>
              <Grid item xs={12} align="center" margin={"auto"} marginTop={4}>
                <Typography variant="h5">
                  {formData.firstName + " " + formData.lastName}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleEditProfile}
              >
                Edit Profile
              </Button>
            </Grid>
          </>
        )}
      </div>
    </ProfileContainer>
  );
};

export default Profile;
