import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Box, Rating } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { config } from "../../../helper/config";

const CardComponent = ({ data }) => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Effect to apply dark mode styles when darkMode state changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <Container sx={{ py: 9 }}>
      <Grid container spacing={3}>
        {data?.length > 0 ? (
          data?.map((o, i) => (
            <Grid item key={i} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  position: "relative",
                  boxShadow: "0px 0px 20px rgba(0,0,0,0)",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  height: "340px",
                  width: "250px",
                  "&:hover": {
                    boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
                  },
                  backgroundColor: darkMode ? "#333" : "#fff", 
                  color: darkMode ? "#fff" : "#333", 
                }}
              >
                {o.discountpercentage && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      zIndex: 1,
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "rgba(255, 105, 135, 0.9)",
                      borderRadius: "50px",
                      padding: "5px 10px",
                      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                    }}
                  >
                    <LocalOfferIcon sx={{ color: "white", marginRight: 1 }} />
                    <Typography
                      variant="body2"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {`${o.discountpercentage} % OFF`}
                    </Typography>
                  </Box>
                )}
                <Box
                  sx={{
                    marginLeft: "20px",
                    height: 'auto',
                    width: "80%",
                    paddingTop: "14px",
                    cursor: "pointer",
                  }}
                >
                  <CardMedia
                    component="img"
                    onClick={() => navigate(`/productdetail/${o.id}`)}
                    sx={{height: '85%'}}
                    image={config.baseUrl + o.image}
                    alt={o.title}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, mt: 28, position: "absolute" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ maxWidth: "100%", overflow: "hidden" }}>
                      <Typography 
                        sx={{ 
                          fontSize: 14,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '100%'
                        }} 
                        gutterBottom
                      >
                        {o.title}
                      </Typography>
                      {o.discountpercentage ? (
                        <>
                          <Typography
                            variant="body2"
                            sx={{
                              textDecoration: "line-through",
                              color: "grey",
                            }}
                          >
                            Rs. {o.price}
                          </Typography>
                          <Typography
                            sx={{ color: "red", fontWeight: "bold", fontSize: 13 }}
                          >
                            Rs.{" "}
                            {o.price - (o.price * o.discountpercentage) / 100}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="body1">Rs. {o.price}</Typography>
                      )}
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        mt: "70px"
                      }}
                    >
                      <Rating
                        size="small"
                        name="half-rating"
                        readOnly
                        sx={{color: darkMode? "#ccc" : 'orange'}}
                        value={parseFloat(o.rating)}
                        precision={0.5}
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({o.rating})
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography sx={{fontSize: 20}}>Some reasons there is no products...</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default CardComponent;
