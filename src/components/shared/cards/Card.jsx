import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { config } from '../../../helper/config';

const CardComponent = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 9 }}>
      <Grid container spacing={3}>
        {data?.length > 0 ? data?.map((o, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <Card
              sx={{
                position: 'relative',
                display: "flex",
                flexDirection: "column",
                height: "100%",
                "&:hover": {
                  boxShadow: "0px 0px 20px rgba(0,0,0,0.1)"
                }
              }}
            >
              {o.discountpercentage && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 105, 135, 0.9)',
                    borderRadius: '50px',
                    padding: '5px 10px',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
                  }}
                >
                  <LocalOfferIcon sx={{ color: 'white', marginRight: '5px' }} />
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {`${o.discountpercentage} % OFF`}
                  </Typography>
                </Box>
              )}
              <CardMedia
                component="img"
                onClick={() => navigate(`/productdetail/${o.id}`)}
                sx={{ height: "300px", cursor: "pointer" }}
                image={config.baseUrl + o.image}
                alt={o.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {o.title}
                </Typography>
                {o.discountpercentage ? (
                  <>
                    <Typography variant="body2" sx={{ textDecoration: "line-through", color: "grey" }}>
                      Rs. {o.price}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "red", fontWeight: "bold" }}>
                      Rs. {o.price - (o.price * o.discountpercentage) / 100}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1">
                    Rs. {o.price}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        )) :
          <h1>No data found</h1>
        }
      </Grid>
    </Container>
  );
};

export default CardComponent;
