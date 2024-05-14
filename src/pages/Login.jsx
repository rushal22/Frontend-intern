import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch} from "react-redux";
import { loginUser , logInError, logInPending, logIn, logInSuccess} from "../reactredux/actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast'
import baseApi from "../apibase-endpoint/apiBase";
import { userEnd } from "../apibase-endpoint/apiEndpoint";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values , setValues] = useState({email: '' , password : ''})


  const handleLogin = async(e) => {
    e.preventDefault();

    try {
      dispatch(logInPending())
      const res = await baseApi({apiDetails:userEnd.login, body:values})
      const resData = res.data
      if(res.status === 200){
        dispatch(logIn(resData.user_data))
        dispatch(logInSuccess(resData.message))
        toast.success(resData.message)
        navigate('/')
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        dispatch(logInError(error))
        toast.error("An error occurred while logging in.");
      }
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "blue" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in 
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Login
            </Button>
            {/* <button onClick={handleLogin}>LOGIN</button> */}
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpw" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;
