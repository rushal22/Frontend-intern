import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Rating,
  CardMedia,
  TextField,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import baseApi from "../../apibase-endpoint/apiBase";
import { cartEnd, productEnd } from "../../apibase-endpoint/apiEndpoint";
import { config } from "../../helper/config";
import CustomButton from "../shared/Buttons/Button";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCart } from "../shared/features/CartContext";
import "../../assets/css/main.css";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const loggedIn = useSelector((state) => state.UserDetails.loggedIn);
  const { updateCartCount } = useCart();
  const [darkMode, setDarkMode] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const handleDialogOpen = () => {
    document.body.classList.add("overflow-auto");
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleViewCart = () => {
    handleDialogClose();
    navigate('/cart');
  };

  const handleLoginDialogOpen = () => {
    setOpenLoginDialog(true);
  };

  const handleLoginDialogClose = () => {
    setOpenLoginDialog(false);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await baseApi({
          apiDetails: productEnd.singleProduct,
          path: { id: id },
        });
        setProductDetail(res.data.data); // Check the response structure
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
    setDarkMode(darkModePreference);
  }, [id]);

  const darkModePreference = localStorage.getItem("darkMode") === "true";

  const handleAdd = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity < productDetail.quantity) {
        return prevQuantity + 1;
      } else {
        return prevQuantity;
      }
    });
  };

  const handleSubtract = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      alert("Quantity cannot go below 1");
    }
  };

  const handleAddToCart = async () => {
    if (!loggedIn) {
      handleLoginDialogOpen();
    } else {
      const res = await baseApi({
        apiDetails: cartEnd.addCart,
        body: {
          product_id: id,
          quantity: quantity,
        },
      });
      console.log(res);
      if (res.status === 200) {
        updateCartCount((prevCount) => prevCount + 1);
        handleDialogOpen();
      }
    }
  };

  const handleBuyNow = () => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      toast.success(`${productDetail.title} placed to Order`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: darkMode ? "#121212" : "#f8f8f8",
        color: darkMode ? "white" : "black",
        minHeight: "100vh",
        padding: "20px",
        marginBottom: -10
      }}
    >
      {productDetail && (
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            bgcolor: darkMode ? "#333" : "#fff",
            color: darkMode ? "white" : "black",
            padding: "20px",
            boxShadow: darkMode
              ? "0px 0px 15px rgba(255, 255, 255, 0.2)"
              : "0px 0px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "600px", // Fixed height for the box
                  position: "relative",
                  backgroundColor: darkMode ? "#1e1e1e" : "white",
                  overflow: "hidden",
                  "&:hover .zoomedImage": {
                    transform: "scale(1.3)",
                  },
                }}
              >
                {productDetail.discountpercentage && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 20,
                      left: 20,
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#ff5722",
                      borderRadius: "50px",
                      padding: "5px 10px",
                      boxShadow: "0 3px 5px 2px rgba(255, 87, 34, .3)",
                    }}
                  >
                    <LocalOfferIcon
                      sx={{ color: "white", marginRight: "5px" }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {`${productDetail.discountpercentage}% OFF`}
                    </Typography>
                  </Box>
                )}
                <CardMedia
                  component="img"
                  className="zoomedImage"
                  sx={{
                    maxHeight: "75%",
                    maxWidth: "100%",
                    backgroundColor: darkMode ? "#1e1e1e" : "white",
                    cursor: "zoom-in",
                    transition: "transform 0.2s ease-in-out",
                    objectFit: "contain", // Ensures the image is contained within the box
                  }}
                  image={config.baseUrl + productDetail.image}
                  alt={productDetail.title}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ padding: "20px" }}>
                <Typography
                  sx={{ color: darkMode ? "white" : "black" }}
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                >
                  {productDetail.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", marginY: 2 }}>
                  <Rating
                    size="small"
                    name="half-rating"
                    readOnly
                    value={parseFloat(productDetail.rating)}
                    precision={0.5}
                  />
                  <Typography sx={{ marginLeft: 1, fontSize: "14px" }}>
                    {productDetail.rating} ({productDetail.rating} reviews)
                  </Typography>
                </Box>
                <Typography
                  sx={{ color: "grey", marginY: 2, fontSize: "14px" }}
                >
                  <strong>Brand:</strong> {productDetail.brand}
                </Typography>
                <Typography
                  sx={{
                    color:
                      darkMode && productDetail.quantity === 0
                        ? "#ff3333"
                        : "#ff3333",
                    marginY: 2,
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {productDetail.quantity > 0
                    ? `Available stock: ${productDetail.quantity}`
                    : "OUT OF STOCK"}
                </Typography>
                <Divider
                  sx={{ marginY: 2, bgcolor: darkMode ? "#333" : "grey" }}
                />

                {productDetail.discountpercentage ? (
                  <Box sx={{ alignItems: "center" }}>
                    <Typography
                      sx={{ textDecoration: "line-through", color: "grey" }}
                    >
                      Rs. {productDetail.price}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#b12704",
                        fontWeight: "bold",
                        marginLeft: 1,
                      }}
                    >
                      Rs.{" "}
                      {productDetail.price -
                        (productDetail.price *
                          productDetail.discountpercentage) /
                          100}
                    </Typography>
                  </Box>
                ) : (
                  <Typography
                    variant="h5"
                    sx={{ color: "#b12704", fontWeight: "bold" }}
                  >
                    Rs. {productDetail.price}
                  </Typography>
                )}

                <Box sx={{ display: "flex", alignItems: "center", marginY: 2 }}>
                  <Typography
                    sx={{ color: darkMode ? "white" : "black", marginRight: 2 }}
                  >
                    Quantity:
                  </Typography>
                  <CustomButton type="sub" onClick={handleSubtract} />
                  <TextField
                    value={quantity}
                    inputProps={{ readOnly: true, min: 1 }}
                    sx={{
                      width: 50,
                      marginX: 1,
                      "& .MuiOutlinedInput-root": {
                        color: darkMode ? "white" : "black",
                        "& fieldset": {
                          borderColor: darkMode ? "white" : "grey",
                        },
                      },
                    }}
                    variant="outlined"
                    size="small"
                  />
                  <CustomButton
                    type="add"
                    onClick={handleAdd}
                    disabled={
                      quantity >= productDetail.quantity ||
                      productDetail.quantity === 0
                    }
                  />
                </Box>

                <Box sx={{ display: "flex", gap: 2, marginY: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleAddToCart}
                    sx={{
                      backgroundColor: "#f0c14b",
                      color: "black",
                      "&:hover": { backgroundColor: "#e2b13c" },
                      pointerEvents:
                        productDetail.quantity === 0 ? "none" : "auto",
                      opacity: productDetail.quantity === 0 ? 2 : 1,
                    }}
                    disabled={productDetail.quantity === 0}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleBuyNow}
                    sx={{
                      backgroundColor: "#ffa41c",
                      color: "black",
                      "&:hover": { backgroundColor: "#e6991a" },
                      pointerEvents:
                        productDetail.quantity === 0 ? "none" : "auto",
                      opacity: productDetail.quantity === 0 ? 2 : 1,
                    }}
                    disabled={productDetail.quantity === 0}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Item Added to Cart</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {quantity} item(s) added to your cart.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
          <Button onClick={handleViewCart} color="primary">
            View Cart
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openLoginDialog} onClose={handleLoginDialogClose}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You need to log in to add items to your cart. Please log in below.
          </DialogContentText>
          {/* Include your login form component here */}
          <Button
          variant="outlined"
            sx={{mt:4}}
            color="primary"
            onClick={() => {
              navigate("/login");
              handleLoginDialogClose();
            }}
          >
            Go to Login Page
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetails;
