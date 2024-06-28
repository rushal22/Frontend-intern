import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Divider, Grid , AppBar, Container } from "@mui/material";
import { Email as EmailIcon, Phone as PhoneIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import baseApi from "../../apibase-endpoint/apiBase";
import { userEnd } from "../../apibase-endpoint/apiEndpoint";
import { config } from "../../helper/config";

const AdminProfile = () => {
  const { firstName, lastName, email, role } = useSelector((state) => state.UserDetails);
  const [profilePic, setProfilePic] = useState()
  const [contact , setContact] = useState()
  useEffect(async()=> {
    const response = await baseApi({apiDetails: userEnd.profile})
    if(response.status === 200) {
      setProfilePic(response.data.user_detail.profile_image)
      setContact(response.data.user_detail.contact)
    }
  },[])

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "300px"
      }}
    >
     <Box
        sx={{
          width: "210mm",
          height: "700px",
          mb: "80px",
          mt: "20px",
          bgcolor: "#F8F8F8",
          padding: "40px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Typography variant="h5" sx={{ mb: 2.5 , color: "black" }}>
          Admin Profile
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item>
            <Avatar
              alt={`${firstName} ${lastName}`}
              src={config.baseUrl + profilePic}
              sx={{ width: 250, height: 250 }}
            />
          </Grid>
          <Grid sx={{marginLeft: "20px"}} item xs={12} sm container direction="column">
            <Grid item xs>
              <Typography variant="h6" sx={{ marginBottom: 1.5, color: "#455A64" , fontWeight: "bold" }}>
                {firstName} {lastName}
              </Typography>
              <Typography sx={{color: "#455A64", fontWeight: "bold", fontSize: 14}}>Role: {role}</Typography>
              <Typography variant="body1" sx={{ color: "black" , display: "flex", alignItems: "center", mt: 1.5 }}>
                <EmailIcon sx={{ mr: 1 , color:"#636764" }} />:
                {email}
              </Typography>
              <Typography variant="body1" sx={{ color: "black", display: "flex", alignItems: "center", mt: 1 }}>
                <PhoneIcon sx={{ mr: 1 , color: "#5D85B0"}} />:
                {contact}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminProfile;
