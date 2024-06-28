import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  CssBaseline,
} from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import baseApi from "../../apibase-endpoint/apiBase";
import { userEnd } from "../../apibase-endpoint/apiEndpoint";
import Loadingpage from "../shared/features/Loadingpage";
import CustomButton from "../shared/Buttons/Button";
import { config } from "../../helper/config";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import TrackOrder from "./TrackOrder";

const ProfileContainer = styled(Container)({
  marginTop: "100px",
  padding: "3rem",
  backgroundColor: "#f0f0f0",
  borderRadius: "8px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
});

const Profile = () => {
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.UserDetails.loggedIn);
  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [resData, setResData] = useState({});
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    contact: "",
    profile_image: null,
  });
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
    fetchData();
  }, [darkMode]);

  const fetchData = async () => {
    try {
      const response = await baseApi({
        apiDetails: userEnd.profile,
      });
      console.log("profile data", response.data);
      setResData(response.data);
      setValues({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        city: response.data.user_detail?.city || "",
        address: response.data.user_detail?.address || "",
        contact: response.data.user_detail?.contact || "",
        profile_image: null,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setLoading(false);
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValues({
        ...values,
        profile_image: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("city", values.city);
      formData.append("address", values.address);
      formData.append("contact", values.contact);
      if (values.profile_image instanceof File) {
        formData.append("profile_image", values.profile_image);
      }

      const res = await baseApi({
        apiDetails: userEnd.editprofile,
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      if (res.status === 200) {
        toast.success(res.data.message);
        setResData(res.data);
        setEditMode(false);
        window.location.reload();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
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
    <ProfileContainer
    
      sx={{
        bgcolor: darkMode ? "#333" : "white",
        color: darkMode ? "#ccc" : "black",
      }}
      maxWidth="xs"
    >
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar
          alt="Profile Picture"
          src={
            profilePic ||
            (resData.user_detail &&
              `${config.baseUrl}${resData.user_detail.profile_image}`)
          }
          sx={{ width: 120, height: 120, marginBottom: "1rem" }}
        />
        <Box
          sx={{
            ml: 8,
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography component="h1" variant="h5">
            {`${resData.firstName} ${resData.lastName}`}
          </Typography>
          <CustomButton type="edit" onClick={handleEditProfile} />
        </Box>
        {loading && <Loadingpage />}

        {!loading && (
          <>
            {editMode ? (
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                style={{ width: "100%", marginTop: "1rem" }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  style={{ marginBottom: "1rem" }}
                />
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <TextField
                    variant="filled"
                    margin="normal"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleInputChange}
                    autoFocus
                    InputProps={{ disableUnderline: true, style: { color: darkMode ? "#ccc" : "black" } }}
                    InputLabelProps={{ style: { color: darkMode ? "#ccc" : "inherit" } }}
                  />
                  <TextField
                    variant="filled"
                    margin="normal"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleInputChange}
                    InputProps={{ disableUnderline: true, style: { color: darkMode ? "#ccc" : "black" } }}
                    InputLabelProps={{ style: { color: darkMode ? "#ccc" : "inherit" } }}
                  />
                  <TextField
                    variant="filled"
                    margin="normal"
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    value={values.city}
                    onChange={handleInputChange}
                    InputProps={{ disableUnderline: true, style: { color: darkMode ? "#ccc" : "black" } }}
                    InputLabelProps={{ style: { color: darkMode ? "#ccc" : "inherit" } }}
                  />
                  <TextField
                    variant="filled"
                    margin="normal"
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    value={values.address}
                    onChange={handleInputChange}
                    InputProps={{ disableUnderline: true, style: { color: darkMode ? "#ccc" : "black" } }}
                    InputLabelProps={{ style: { color: darkMode ? "#ccc" : "inherit" } }}
                  />
                  <TextField
                    variant="filled"
                    margin="normal"
                    fullWidth
                    id="contact"
                    label="Contact"
                    name="contact"
                    value={values.contact}
                    onChange={handleInputChange}
                    InputProps={{ disableUnderline: true, style: { color: darkMode ? "#ccc" : "black" } }}
                    InputLabelProps={{ style: { color: darkMode ? "#ccc" : "inherit" } }}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                  <CustomButton type="save" />
                </Box>
              </form>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: '1px',
                }}
              >
                <Typography
                  variant="body1"
                  align="center"
                  color={darkMode ? "#ccc" : "textSecondary"}
                  gutterBottom
                >
                  <IconButton disabled>
                    <LocationOnIcon sx={{ color: darkMode ? "white" : "textSecondary" }} />
                  </IconButton>
                  {resData.user_detail?.address}, {resData.user_detail?.city}
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color={darkMode ? "#ccc" : "textSecondary"}
                  gutterBottom
                >
                  <IconButton disabled>
                    <EmailIcon sx={{ color: darkMode ? "white" : "textSecondary" }} />
                  </IconButton>
                  {resData.email}
                </Typography>
                <Typography
                sx={{mr: 10}}
                  variant="body2"
                  align="center"
                  color={darkMode ? "#ccc" : "textSecondary"}
                  gutterBottom
                >
                  <IconButton disabled>
                    <PhoneIcon sx={{ color: darkMode ? "white" : "textSecondary" }} />
                  </IconButton>
                  {resData.user_detail?.contact}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </ProfileContainer>
  );
};

export default Profile;
