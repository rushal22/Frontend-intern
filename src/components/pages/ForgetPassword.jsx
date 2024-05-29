import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Link,
  Paper,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import baseApi from "../../apibase-endpoint/apiBase";
import { userEnd } from "../../apibase-endpoint/apiEndpoint";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgetPasswordForm = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({ email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await baseApi({
        apiDetails: userEnd.forgetpassword,
        body: value,
        requireAuth: false
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      let backendError = error.response.data.message
      toast.error(backendError);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: 1, marginTop: 9 }}>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" align="center">
            Forget Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Reset Email
            </Button>
          </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2">
                <Link href="/login">Back to Sign In</Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ForgetPasswordForm;
