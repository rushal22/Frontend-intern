import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Typography,
  Box,
  Button,
  Rating,
  CardMedia,
  TextField,
} from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import baseApi from '../../apibase-endpoint/apiBase';
import { productEnd } from '../../apibase-endpoint/apiEndpoint';
import { config } from '../../helper/config';
import CustomButton from '../shared/Buttons/Button';
import {toast} from 'react-hot-toast'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../shared/features/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [productDetail, setProductDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const loggedIn = useSelector(state => state.UserDetails.loggedIn)
  const { setNotificationCount} = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await baseApi({apiDetails : productEnd.singleProduct , path: {id :id} });
        setProductDetail(res.data.data); // Check the response structure
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAdd = () => {
    setQuantity(prevQuantity => {
      if (prevQuantity < 5){
        return prevQuantity + 1
      }else {
        alert("Quantity of item limits upto 5");
        return prevQuantity
      }
    });
  };

  const handleSubtract = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    } else {
      alert("Quantity cannot go below 1");
    }
  };
  const handleAddToCart = () => {
    if(!loggedIn){
      navigate('/login')
    }else{
      setNotificationCount(prevCount => prevCount + 1);
      toast.success(`${productDetail.title} added in cart`)
    }
  }
  const handleBuyNow = () => {
    if(!loggedIn){
      navigate('/login')
    }else{
      toast.success(`${productDetail.title} place to Order`)
    }
  }
  return (
   <div className='main-content'>
      {productDetail && (
      
      <Box sx={{ display: "flex", width: "100%", bgcolor: "white" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box
              sx={{
                height: "91vh",
                width: "100vh",  
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#DADDE1",
                position: 'relative'
              }}
            >
              {productDetail.discountpercentage && (
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
                    {`${productDetail.discountpercentage}% OFF`}
                  </Typography>
                </Box>
              )}
              <CardMedia
                component="img"
                sx={{ height: "100%", width: "100%", position: "static", backgroundColor: "darkgrey" }}
                image={config.baseUrl + productDetail.image}
                alt={productDetail.title}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                height: "91vh",
                backgroundColor: "white",
                padding: "48px 0px 0px 56px",
              }}
            >
              <Box>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "24px" }}
                  color={"orange"}
                >
                  {productDetail.category}
                </Typography>
              </Box>
              <Box sx={{ padding: "32px 0px" }}>
                <Typography
                  style={{ fontWeight: "bold", fontSize: "24px" }}
                  color={"black"}
                >
                  {productDetail.title}
                </Typography>
              </Box>
              <Box sx={{ width: "80%" }}>
                <Typography sx={{ color: "#505051", fontSize: "20px" }}>
                  {productDetail.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  color: "#666766",
                  display: "flex",
                  gap: 3,
                  padding: "32px 0px",
                }}
              >
                <Rating
                  name="half-rating"
                  readOnly
                  value={parseFloat(productDetail.rating)}
                  precision={0.5}
                />
                <Typography>
                  {productDetail.rating} ({productDetail.rating}{" "}
                  reviews)
                </Typography>
              </Box>
              <Box>
                {productDetail.discountpercentage ? (
                  <>
                    <Typography sx={{ textDecoration: "line-through", color: "grey" }}>
                      Rs. {productDetail.price}
                    </Typography>
                    <Typography sx={{ color: "#F57220", fontWeight: "bold" }}>
                      Price: Rs. {productDetail.price - (productDetail.price * productDetail.discountpercentage) / 100}
                    </Typography>
                  </>
                ) : (
                  <Typography sx={{ color: "#F57220", fontWeight: "bold" }}>
                    Price: Rs. {productDetail.price}
                  </Typography>
                )}
              </Box>
              <Box 
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                padding: "40px 500px 0px 0px"
              }}>
                <Typography sx={{ color: 'red'}}> Quantity: </Typography>
                <CustomButton
                type='sub'
                onClick={handleSubtract}
                />
                <Box sx={{width: 100}}>
                <TextField
                  value={quantity}
                  inputProps={{readOnly: true , min:1}} 
                  sx={{width: 40, textAlign: 'center'}}
                  variant='outlined'
                  size='small'
                />
                </Box>
                <CustomButton 
                type= 'add'
                onClick={handleAdd}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "50%",
                  flexWrap: "wrap",
                  gap: 3,
                  padding: "40px 0px 0px 0px",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleAddToCart} 
                >
                  Add to Cart
                </Button>
            
                <Button
                  variant="contained"
                  onClick={handleBuyNow}
                  color="success"
                >
                  Buy now
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
  )}
   </div>
  );
};

export default ProductDetails;
