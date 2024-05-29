import React from 'react';
import { Typography, Link, IconButton, Grid } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '20px',
  marginTop: 'auto',
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <Typography variant="body1" align="center" gutterBottom>
        Get connected
      </Typography>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="Instagram" style={{ marginRight: '10px', color: "#E4405F" }}>
              <InstagramIcon />
            </IconButton>
          </Link>
        </Grid>
        <Grid item>
          <Link href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="LinkedIn" style={{ marginRight: '10px', color: "#0077B5" }}>
              <LinkedInIcon />
            </IconButton>
          </Link>
        </Grid>
      </Grid>
      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} Genius System Nepal. All rights reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
