import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import baseApi from "../../apibase-endpoint/apiBase";
import { userEnd } from "../../apibase-endpoint/apiEndpoint";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const NewPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [value, setValue] = useState({
    password: "",
    password_confirmation: ""
  });
  const [passwordError, setPasswordError] = useState("");
 console.log("hello");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.password !== value.password_confirmation) {
      setPasswordError("Passwords do not match");
      return;
    }
    console.log("hello");
    try {
      const res = await baseApi({
        apiDetails: userEnd.reset,
        body: {
          password: value.password,
          password_confirmation: value.password_confirmation,
        },
        path: {token: token}
      });
      console.log(res.data);
      const resData = res.data;
      if (res.status === 200) {
        toast.success(resData.message);
        navigate("/login");
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      toast.error("An error occurred while resetting the password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ marginTop: 20 }}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            sx={{width: "30%"}}
            required
            margin="normal"
            id="password"
            name="password"
            type="password"
            label="New Password"
            value={value.password}
            onChange={(e) => setValue({ ...value, password: e.target.value })}
          />
        </Box>
        <TextField
          sx={{width: "30%"}}
          margin="normal"
          required
          id="confirm_password"
          name="confirm_password"
          type="password"
          label="Confirm New Password"
          value={value.password_confirmation}
          error={Boolean(passwordError)}
          helperText={passwordError}
          onChange={(e) =>
            setValue({ ...value, password_confirmation: e.target.value })
          }
        />
      </Box>
        <Button type="submit" variant="contained" color="primary">
          Reset Password
        </Button>
    </form>
  );
};

export default NewPassword;
