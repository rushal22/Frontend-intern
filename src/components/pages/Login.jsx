import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { logInError, logInPending, logIn, logInSuccess } from "../../reactredux/actions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import baseApi from "../../apibase-endpoint/apiBase";
import { userEnd } from "../../apibase-endpoint/apiEndpoint";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({ email: '', password: '' });
  const [step, setStep] = useState(1); // To handle step changes

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(logInPending());

    try {
      const res = await baseApi({ apiDetails: userEnd.login, body: values });
      const resData = res.data;
      if (res.status === 200) {
        localStorage.setItem("Bearer", resData.access_token);
        dispatch(logIn(resData.user_data));
        dispatch(logInSuccess(resData.message));
        toast.success(resData.message);
        navigate('/');
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      dispatch(logInError(error));
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while logging in.");
      }
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (values.email) {
      setStep(2);
    } else {
      toast.error("Please enter your email.");
    }
  };

  const handleBackToEmail = () => {
    setStep(1);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              mt: 5,
              border: "1px solid black",
              borderRadius: 1,
              padding: 3,
              width: '100%',
              bgcolor: 'white',
              height: 400,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ mb: 1 }}>
              <img src='/SR.png' alt="Shopify" style={{ width: "35px", height: "50px" }} />
            </Box>
            <Typography component="h1" variant="h5" align="center">
              Sign In
            </Typography>
            {step === 1 ? (
              <form onSubmit={handleEmailSubmit} style={{ width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  size="small"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 1, bgcolor: '#FFD814', color: 'black' }}
                >
                  Continue
                </Button>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  By continuing, you agree to the Shopify's condition of Use and Privacy Notice.
                </Typography>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Typography>
              </form>
            ) : (
              <form onSubmit={handleLogin} style={{ width: '100%', marginTop: 5}}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Email: {values.email} 
                  <Link  onClick={handleBackToEmail} variant="body2" sx={{ ml: 1 }}>
                    Change
                  </Link>
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  size="small"
                  value={values.password}
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                />
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Link href="/forgotpw" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, bgcolor: '#FFD814', color: 'black' }}
                >
                  Sign In
                </Button>
              </form>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
