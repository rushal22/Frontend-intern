import React from "react";
import { Typography, Link, IconButton, Grid } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer
      style={{
        boxShadow: "0px 0px 20px rgba(0,0,0,0)",
        position: "static",
        backgroundColor: "#333",
        color: "#fff",
        textAlign: "center",
        width: "100%",
        padding: "20px",
        bottom: 0,
        boxSizing: "border-box",
      }}
    >
      <Typography variant="body1" gutterBottom>
        Get connected
      </Typography>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton aria-label="Instagram" style={{ color: "#E4405F" }}>
              <InstagramIcon />
            </IconButton>
          </Link>
        </Grid>
        <Grid item>
          <Link
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton aria-label="LinkedIn" style={{ color: "#0077B5" }}>
              <LinkedInIcon />
            </IconButton>
          </Link>
        </Grid>
      </Grid>
      <Typography variant="body2" align="center" style={{ marginTop: "10px" }}>
        &copy; {new Date().getFullYear()} Genius System Nepal. All rights reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
