import React from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


const cardComponent = () => {
    return (
      <>
      {/* Hero unit */}
      <Container sx={{ py: 10 }} maxWidth="sm">
        {/* End hero unit */}
        <Grid container spacing={-1}>
          
            <Card
              sx={{ display: "flex", flexDirection: "column" }}
              >
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  cursor: "pointer",
                }}
                image= {`https://plus.unsplash.com/premium_photo-1675896084254-dcb626387e1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D`}
                alt="random"
                />
              <CardContent sx={{ flexGrow: 2 }}>
                Product Name
              </CardContent>
              <CardActions>
                <Typography textAlign="left" variant="h8">
                  Add to Cart
                </Typography>
              </CardActions>
            </Card>
          </Grid>
      </Container>
    </>
    );
};

export default cardComponent;