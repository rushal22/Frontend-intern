import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import baseApi from "../../apibase-endpoint/apiBase";
import { userEnd } from "../../apibase-endpoint/apiEndpoint";
import Loadingpage from "../shared/features/Loadingpage";
import CustomButton from "../shared/Buttons/Button";

const ProfileContainer = styled(Container)({
  marginTop: "2rem",
});

const Profile = () => {
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.UserDetails.loggedIn);
  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [resData, setResData] = useState({});
  const [loading, setLoading] = useState(true); 
  const [values , setValues] = useState({firstName:'' , lastName: ''})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseApi({
          apiDetails: userEnd.profile
        });
        setResData(response.data);
        setValues(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false)
      } 
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await baseApi({apiDetails: userEnd.editprofile , body: values})
      if(res.status === 200){
        toast.success(res.data.message)
        setResData(values)
        setEditMode(false)
      }
      // console.log("Updated Profile Data:", resData);
    }catch(error){
      console.error("Error updating profile:", error);
    }
  };

  const handleEditProfile = () => {
    setEditMode(true);
    if (!loggedIn) {
      toast.error("You need to Login first");
      navigate("/login");
    }
  };

  return (
    <ProfileContainer component="main" maxWidth="xs" style={{ height: "100vh"}}>
      <CssBaseline />
      <div>
        <Avatar
          alt="Profile Picture"
          src={profilePic}
          sx={{ width: 100, height: 100, margin: "auto", marginTop: 8.01 }}
        />
        {/* Show loading spinner until data is fetched */}
        {loading && <Loadingpage />}
        {!loading && (
          <>
            {editMode ? (
              <>
                <Typography component="h1" variant="h5" align="center">
                  Edit Your Profile
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
                    value={values.firstName}
                    onChange={handleInputChange}
                    className="profile-textfield"
                    InputProps={{ style: { borderColor: "red" } }}
                  />
                  <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleInputChange}
                    className="profile-textfield"
                    InputProps={{ style: { borderColor: "red" } }}
                  />
                  <CustomButton type="save"  />
                </form>
              </>
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} align="center" margin={"auto"} marginTop={4}>
                    <Typography variant="h5">
                      {resData.firstName + " " + resData.lastName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} align="center">
                  <CustomButton
                    type='edit'
                    onClick={handleEditProfile}
                  />
                </Grid>
              </>
            )}
          </>
        )}
      </div>
    </ProfileContainer>
  );
};

export default Profile;
