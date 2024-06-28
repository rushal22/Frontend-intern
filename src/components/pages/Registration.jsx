import React, { useState } from "react";
import {
  Avatar,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import baseApi from "../../apibase-endpoint/apiBase";
import { userEnd } from "../../apibase-endpoint/apiEndpoint";
import toast from "react-hot-toast";
import CustomButton from "../shared/Buttons/Button";

const Registration = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      setPasswordError("Password doesn't match");
      return;
    }
    try {
      const res = await baseApi({ apiDetails: userEnd.signup, body: values });
      const resData = res.data;
      if (res.status === 200) {
        navigate("/login");
        toast.success(resData.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while registering.");
      }
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              mt: 10,
              border: "1px solid black",
              borderRadius: 1,
              padding: 3,
              width: "100%",
              bgcolor: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ mb: 2 }}>
              <img src="/SR.png" alt="Shopify" style={{ width: "35px", height: "50px" }} />
            </Box>
            <Typography component="h1" variant="h5" align="center">
              Sign Up
            </Typography>
            <Box onSubmit={handleRegister} component="form" noValidate sx={{ mt: 3, width: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) => setValues({ ...values, firstName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => setValues({ ...values, lastName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    error={Boolean(passwordError)}
                    helperText={passwordError}
                    onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomButton type="register" />
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Registration;
