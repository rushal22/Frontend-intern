import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import baseApi from "../../apibase-endpoint/apiBase";
import { orderEnd, userEnd } from "../../apibase-endpoint/apiEndpoint";
import Loadingpage from "../shared/features/Loadingpage";
import CustomButton from "../shared/Buttons/Button";
import { config } from "../../helper/config";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useDispatch } from "react-redux";
import { logIn } from "../../reactredux/actions";

const ProfileContainer = styled(Container)({
  marginTop: "100px",
  padding: "3rem",
  backgroundColor: "#f0f0f0",
  borderRadius: "8px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
});

const DialogContainer = styled(Dialog)({
  "& .MuiDialog-paper": {
    minWidth: "320px",
    borderRadius: "12px",
  },
});

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [userid, setUserId] = useState();
  const loggedIn = useSelector((state) => state.UserDetails.loggedIn);
  const [editMode, setEditMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog visibility
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
  const [orders, setOrders] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
    fetchData();
    handleUserOrderHistory();
  }, [darkMode]);

  const fetchData = async () => {
    try {
      const response = await baseApi({
        apiDetails: userEnd.profile,
      });
      console.log("profile data", response.data);
      setResData(response.data);
      setUserId(response.data.id);
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

  const handleUserOrderHistory = async () => {
    try {
      const response = await baseApi({
        apiDetails: orderEnd.singleOrder,
        path: {userid},
      });
      
      console.log("User Orders:", response.data);
      if (response.status === 200) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching user order history:", error);
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
      console.log("saved" ,res);
      if (res.status === 200) {
        dispatch(logIn(res.data.data))
        toast.success(res.data.message);
        setResData(res.data.data);
        setEditMode(false);
        setDialogOpen(false); // Close the dialog after successful update
        // window.location.reload();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleEditProfile = () => {
    setEditMode(true);
    setDialogOpen(true); // Open the edit dialog
    if (!loggedIn) {
      toast.error("You need to Login first");
      navigate("/login");
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false); // Close the dialog
    setEditMode(false); // Reset edit mode
    // Optionally reset form values here if needed
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
        {loading ? <Loadingpage /> : (
          <>
            <DialogContainer open={dialogOpen} onClose={handleDialogClose}>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogContent sx={{ pb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar
                    alt="Profile Picture"
                    src={
                      profilePic ||
                      (resData.user_detail &&
                        `${config.baseUrl}${resData.user_detail.profile_image}`)
                    }
                    sx={{ width: 120, height: 120, marginBottom: "1rem" }}
                  />
                </Box>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  style={{ display: "none" }}
                  id="profile-image-upload"
                />
                <label htmlFor="profile-image-upload">
                  <Button
                    sx={{ fontWeight: "bold", width: "50%", ml: 15 }}
                    variant="outlined"
                    component="span"
                    fullWidth
                  >
                    Upload New Picture
                  </Button>
                </label>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleInputChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="city"
                      label="City"
                      name="city"
                      value={values.city}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      value={values.address}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="contact"
                      label="Contact"
                      name="contact"
                      value={values.contact}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="secondary">
                  Cancel
                </Button>
                <CustomButton type="save" onClick={handleSubmit} />
              </DialogActions>
            </DialogContainer>

            {!editMode && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "1px",
                }}
              >
                <Typography
                  variant="body1"
                  align="center"
                  color={darkMode ? "#ccc" : "textSecondary"}
                  gutterBottom
                >
                  <IconButton disabled>
                    <LocationOnIcon
                      sx={{ color: darkMode ? "white" : "textSecondary" }}
                    />
                  </IconButton>
                  {resData.user_detail?.address},{" "}
                  {resData.user_detail?.city}
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color={darkMode ? "#ccc" : "textSecondary"}
                  gutterBottom
                >
                  <IconButton disabled>
                    <EmailIcon
                      sx={{ color: darkMode ? "white" : "textSecondary" }}
                    />
                  </IconButton>
                  {resData.email}
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color={darkMode ? "#ccc" : "textSecondary"}
                  gutterBottom
                >
                  <IconButton disabled>
                    <PhoneIcon
                      sx={{ color: darkMode ? "white" : "textSecondary" }}
                    />
                  </IconButton>
                  {resData.user_detail?.contact}
                </Typography>
              </Box>
            )}

            {/* User Order History Box */}
            <Paper
              elevation={3}
              sx={{
                width: "100%",
                padding: "1rem",
                marginTop: "2rem",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Your Order History
              </Typography>
              {orders.length === 0 ? (
                <Typography variant="body2" color="textSecondary">
                  No orders found.
                </Typography>
              ) : (
                orders.map((order) => (
                  <Box
                    key={order.order_id}
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      padding: "0.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Typography variant="body2">
                          Order ID: {order.order_id}
                        </Typography>
                        <Typography variant="body2">
                          Order Date: {order.order_date}
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "0.5rem",
                            flexWrap: "wrap",
                          }}
                        >
                          {order.items.map((item) => (
                            <img
                              key={item.product_id}
                              src={item.product_image}
                              alt={item.product_name}
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "8px",
                                objectFit: "cover",
                              }}
                            />
                          ))}
                        </Box>
                        <Typography variant="body2">
                          Total Price: ${order.total_price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))
              )}
            </Paper>
          </>
        )}
      </Box>
    </ProfileContainer>
  );
};

export default Profile;
