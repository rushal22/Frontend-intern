import React from 'react';
import Slider from 'react-slick';
import { Box, Paper } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {
  const banners = ['/banner1.jpg', '/banner2.jpg', '/banner3.jpg', '/banner4.jpg'];

  return (
    <Box sx={{ width: '920px', overflowX: 'hidden',overflowY: "hidden"  }}>
      <Slider
        dots
        infinite
        speed={300}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay
        autoplaySpeed={2000}
       >
        {banners.map((banner, index) => (
          <Paper key={index} sx={{boxShadow: "0px 0px 20px rgba(0,0,0,0)", marginTop: '90px', height: '320px' }}>
            <Box
              component="img"
              src={banner}
              alt={`Banner ${index + 1}`}
              sx={{ width: '100%', height: 'auto'}}
            />
          </Paper>
        ))}
      </Slider>
    </Box>
  );
};

export default Banner;
