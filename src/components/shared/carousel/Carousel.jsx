import React from 'react';
import { Box, Grid} from '@mui/material';
import Carousel from 'react-material-ui-carousel';

const MyCarousel = ({ Productdata }) => {
  return (
    <>
      {Productdata && Productdata.length ? (
        <Box display={"flex"} justifyContent={"center"} padding={"5px"}>
          <Carousel>
            {Productdata.map((item, i) => (
              <Grid key={i} container justifyContent="center" alignItems="center">
                <Grid item>
                  <Box position="relative" height={300} width={900}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Carousel>
        </Box>
      ) : null}
    </>
  );
};

export default MyCarousel;
