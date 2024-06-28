import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import baseApi from "../../apibase-endpoint/apiBase";
import { cartEnd } from "../../apibase-endpoint/apiEndpoint";
import toast from "react-hot-toast";
import { config } from "../../helper/config";
import CustomButton from "../shared/Buttons/Button";
import { useNavigate } from "react-router-dom";
import "../../assets/css/main.css";

const Cart = () => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [earliestDeliveryDate, setEarliestDeliveryDate] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    const fetchCartData = async () => {
      const res = await baseApi({ apiDetails: cartEnd.viewCart });
      console.log(res);
      if (res.status === 200) {
        setCartItems(res.data.cart.products);
        setDeliveryCharge(res.data.deliverycharge);
        calculateTotalPrice(res.data.cart.products);
      }
    };
    fetchCartData();

    const calculateEarliestDeliveryDate = () => {
      const today = new Date();
      today.setDate(today.getDate() + 3);
      const options = { day: "numeric", month: "long" };
      return today.toLocaleDateString(undefined, options);
    };

    setEarliestDeliveryDate(calculateEarliestDeliveryDate());
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#333" : "#fff";
    document.body.style.color = darkMode ? "#fff" : "#000";
  }, [darkMode]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => {
      const itemPrice = item.discountpercentage
        ? item.price * ((100 - item.discountpercentage) / 100)
        : item.price;
      return sum + itemPrice * item.pivot.quantity;
    }, 0);
    return total;
  };

  const updateCart = async (productId, quantity) => {
    const response = await baseApi({
      apiDetails: cartEnd.updateCart,
      body: { product_id: productId, quantity: quantity },
    });
    if (response.status === 200) {
      const updatedCart = await baseApi({ apiDetails: cartEnd.viewCart });
      console.log(updatedCart);
      if (updatedCart.status === 200) {
        setCartItems(updatedCart.data.cart.products);
        calculateTotalPrice(updatedCart.data.cart.products);
      } else {
        toast.error(updatedCart.data.cart);
      }
    } else {
      toast.error(response.errors);
    }
  };

  const handleAdd = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].pivot.quantity += 1;
    setCartItems(newCartItems);
    updateCart(newCartItems[index].id, newCartItems[index].pivot.quantity);
  };

  const handleSubtract = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].pivot.quantity > 1) {
      newCartItems[index].pivot.quantity -= 1;
      setCartItems(newCartItems);
      updateCart(newCartItems[index].id, newCartItems[index].pivot.quantity);
    }
  };

  const openDeleteDialog = (index) => {
    document.body.classList.add("overflow-auto");
    setDeleteIndex(index);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteIndex !== null) {
      const productId = cartItems[deleteIndex].id;
      const res = await baseApi({
        apiDetails: cartEnd.deleteCart,
        body: { product_id: productId },
      });

      if (res.status === 200) {
        // Update notification count in localStorage
        const currentNotificationCount =
          parseInt(localStorage.getItem("notificationCount")) || 0;
        if (currentNotificationCount > 0) {
          localStorage.setItem(
            "notificationCount",
            (currentNotificationCount - 1).toString()
          );
        }
        const newCartItems = cartItems.filter((_, i) => i !== deleteIndex);
        setCartItems(newCartItems);
        calculateTotalPrice(newCartItems);
      } else {
        toast.error("Error deleting item from cart");
      }
    }
    setDeleteDialogOpen(false);
  };

  return (
    <Container className="content">
      {cartItems.length === 0 && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography  sx={{ mb: 2 }}>
            There is no item in this cart
          </Typography>
          <Button
            onClick={() => navigate("/")}
            sx={{
              border: "0.1px solid orange",
              color: "orange",
              fontSize: 17,
            }}
            size="medium"
            variant="text"
          >
            Continue Shopping
          </Button>
        </Box>
      )}

      {cartItems.length > 0 && (
        <>
          <Box
            sx={{
              position: "absolute",
              marginTop: "10px",
              paddingLeft: "5px",
              width: "750px",
              bgcolor: "white",
              display: "flex",
              marginLeft: "2px",
              color: darkMode ? "#fff" : "#000",
              backgroundColor: darkMode ? "#333" : "#fff",
              border: "none", // Add this line
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                right: 1,
                top: -10,
                color: darkMode ? "#fff" : "#636363",
                padding: "8px",
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              Earliest Delivery: {earliestDeliveryDate}
            </Typography>
            <Box
              sx={{
                width: "800px",
                bgcolor: darkMode ? "#333" : "white",
                color: darkMode ? "#fff" : "#333",
                marginLeft: "-101px",
                border: "none", // Add this line
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
              }}
            >
              {cartItems.map((item, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      bgcolor: darkMode ? "#333" : "white",
                      color: darkMode ? "white" : "#333",
                      marginTop: "25px",
                      marginBottom: "25px",
                      padding: "10px",
                      display: "flex",
                      marginRight: "10px",
                      width: "100%",
                      border: "none", // Add this line
                    }}
                  >
                    <img
                      onClick={() => navigate(`/productdetail/${item.id}`)}
                      style={{
                        cursor: "pointer",
                        height: "100px",
                        width: "100px",
                      }}
                      src={config.baseUrl + item.image}
                      alt={item.title}
                    />
                    <Box sx={{ marginLeft: "50px", display: "flex" }}>
                      <Typography sx={{ fontWeight: "bold", position: "absolute" }}>
                        {item.title}
                      </Typography>
                      <Box
                        sx={{
                          marginLeft: "240px",
                          position: "absolute",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                        }}
                      >
                        {item.discountpercentage ? (
                          <>
                            <Typography
                              sx={{
                                marginRight: "20px",
                                color: "CaptionText",
                                fontSize: 15,
                                textDecoration: "line-through",
                              }}
                            >
                              Rs.{item.price * item.pivot.quantity}
                            </Typography>
                            <Typography
                              sx={{
                                color: "red",
                                fontSize: 17,
                              }}
                            >
                              Rs.
                              {(
                                item.price *
                                ((100 - item.discountpercentage) / 100) *
                                item.pivot.quantity
                              ).toFixed(2)}
                            </Typography>
                          </>
                        ) : (
                          <Typography
                            sx={{
                              color: "CaptionText",
                              fontSize: 17,
                            }}
                          >
                            Rs.{item.price * item.pivot.quantity}
                          </Typography>
                        )}
                      </Box>
                      <Box sx={{ marginLeft: "240px", marginTop: "40px" }}>
                        <CustomButton
                          type="delete"
                          onClick={() => openDeleteDialog(index)}
                        />
                      </Box>
                      <Box sx={{ marginLeft: "390px", position: "absolute" }}>
                        <CustomButton
                          type="sub"
                          onClick={() => handleSubtract(index)}
                        />
                      </Box>
                      <Box
                        sx={{
                          width: 60,
                          position: "absolute",
                          marginLeft: "470px",
                        }}
                      >
                        <TextField
                          value={item.pivot.quantity}
                          inputProps={{ readOnly: true, min: 1 }}
                          InputProps={{
                            style: { color: darkMode ? "#ccc" : "black", width: 48 },
                          }}
                          variant="outlined"
                          size="small"
                        />
                      </Box>
                      <Box sx={{ marginLeft: "540px", position: "absolute" }}>
                        <CustomButton type="add" onClick={() => handleAdd(index)} />
                      </Box>
                    </Box>
                    {index !== cartItems.length - 1 && <Divider />}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              position: "absolute",
              paddingLeft: "5px",
              paddingRight: "10px",
              width: "420px",
              height: "290px",
              paddingBottom: "20px",
              bgcolor: "white",
              marginTop: "10px",
              textAlign: "left",
              marginLeft: "780px",
              color: darkMode ? "#fff" : "#000",
              backgroundColor: darkMode ? "#333" : "#fff",
              border: "none", // Add this line
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            <Typography sx={{ marginTop: "10px" }} variant="h5">
              Order Summary
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
                color: darkMode ? "#fff" : "#636363",
                fontSize: 15,
              }}
            >
              <Typography>
                Subtotal ({`${cartItems.length} items`})
              </Typography>
              <Typography>
                Rs. {calculateTotalPrice(cartItems).toFixed(2)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "15px",
                color: darkMode ? "#fff" : "#636363",
                fontSize: 15,
              }}
            >
              <Typography>Delivery Charge </Typography>
              <Typography>{deliveryCharge}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "40px",
                color: darkMode ? "#fff" : "#636363",
                fontSize: 15,
              }}
            >
              <Typography>Total</Typography>
              <Typography sx={{ color: "#ff0000" }}>
                Rs. {(calculateTotalPrice(cartItems) + deliveryCharge).toFixed(2)}
              </Typography>
            </Box>
            <Box
              sx={{
                marginTop: "40px",
                marginLeft: "20px",
              }}
            >
              <Button
                onClick={() => navigate("/order")}
                type="submit"
                variant="contained"
                sx={{
                  height: "45px",
                  bgcolor: "#F57224",
                  "&:hover": {
                    bgcolor: "#F57224",
                  },
                  width: "100%",
                }}
              >
                Proceed to Checkout ({`${cartItems.length}`})
              </Button>
            </Box>
          </Box>
        </>
      )}

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Remove From Cart</DialogTitle>
        <DialogContent>
          <Typography>Item(s) will be removed from order.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            sx={{ backgroundColor: "#2ABBE8", color: "#fff" }}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;
