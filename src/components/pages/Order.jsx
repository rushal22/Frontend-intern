import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Container, Grid } from "@mui/material";
import baseApi from "../../apibase-endpoint/apiBase";
import { cartEnd, orderEnd } from "../../apibase-endpoint/apiEndpoint";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { config } from "../../helper/config";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const { firstName, lastName, user_detail, email } = useSelector(
    (state) => state.UserDetails
  );
  const [subtotal , setSubtotal] = useState()
  const [totalPrice , setTotal] = useState()
  const [cartItems, setCartItems] = useState([]);
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    address: user_detail.address || "",
    city: user_detail.city || "",
    contact: user_detail.contact || "",
  });

  const [deliveryCharge, setDeliveryCharge] = useState(); 

  useEffect(() => {
    fetchCartData(); 
  }, []);
  console.log(cartItems);

  const fetchCartData = async () => {
    try {
      const res = await baseApi({ apiDetails: cartEnd.viewCart }); 
      console.log(res);
      if (res.status === 200) {
        setSubtotal(res.data.subtotal)
        setCartItems(res.data.cart.products);
        setDeliveryCharge(res.data.deliverycharge);
        setTotal(res.data.total)
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to fetch cart items");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await baseApi({
        apiDetails: orderEnd.placeOrder,
        body: {
          shipping_address: deliveryDetails.address,
        },
      });
      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message);
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again later.");
    }
  };

  return (
    <Container style={{ marginTop: "30px" }}>
      <Grid container spacing={3}>
        {/* Left Column: Shipping Address */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              
              padding: "10px",
              bgcolor: darkMode ? "#333" : "#fff",
              color: darkMode ? "#fff" : "#000",
              border: "none",
              minHeight: "180px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            <Typography sx={{ fontWeight: "bold",fontSize: 15, marginBottom: "15px" }}>
              Deliver to -: {deliveryDetails.firstName} {deliveryDetails.lastName}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: "5px" }}>
              {deliveryDetails.contact} | {deliveryDetails.address}, {deliveryDetails.city}
            </Typography>
            <Typography sx={{ fontSize: 15, marginTop: "20px" }}>
              Email to {email}
            </Typography>
          </Box>
        </Grid>

        {/* Right Column: Order Summary */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: "10px",
              bgcolor: darkMode ? "#333" : "#fff",
              color: darkMode ? "#fff" : "#000",
              border: "none",
              minHeight: "180px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            <Typography
              sx={{ fontSize: 19, fontWeight: "bold", marginBottom: "10px" }}
            >
              Order Summary
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              {cartItems.map((item, index) => (
                <Box key={index} sx={{ width: "100%", marginBottom: "10px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    <Typography variant="body1">{item.title}</Typography>
                    <img
                      onClick={() => navigate(`/productdetail/${item.id}`)}
                      src={config.baseUrl + item.image}
                      style={{ height: "50px", marginLeft: "10px", cursor: "pointer" }}
                    />
                  </Box>
                  <Typography variant="body2" >
                    Quantity: 1 x {item.pivot.quantity}
                  </Typography>
                  <Typography variant="body2">
                    Price: Rs. {(item.price * item.pivot.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <Typography>Subtotal Items ({cartItems.length} items)</Typography>
                <Typography>
                  Rs.{subtotal}
                 </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <Typography>Delivery Charge</Typography>
                <Typography>Rs. {deliveryCharge}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: "10px",
                  borderTop: "1px solid #ccc",
                  paddingTop: "10px",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>Total</Typography>
                <Typography sx={{ fontWeight: "bold", color: "#f00" }}>
                  Rs.{totalPrice}
                  </Typography>
              </Box>
            </Box>
            <Button
              onClick={handlePlaceOrder}
              variant="contained"
              color="primary"
              sx={{
                marginTop: "20px",
                width: "100%",
                bgcolor: "#F57224",
                "&:hover": {
                  bgcolor: "#F57224",
                },
              }}
            >
              Place Order
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Order;
