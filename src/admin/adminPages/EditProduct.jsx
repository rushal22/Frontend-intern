import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
} from "@mui/material";
import { Check as CheckIcon, Inventory as InventoryIcon } from '@mui/icons-material';
import baseApi from "../../apibase-endpoint/apiBase";
import { productEnd } from "../../apibase-endpoint/apiEndpoint";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { config } from "../../helper/config";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [productDetail, setProductDetail] = useState({
    title: "",
    brand: "",
    description: "",
    price: "",
    rating: "",
    quantity: "",
    discountpercentage: "",
    category_id: "",
    image: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await baseApi({ apiDetails: productEnd.singleProduct, path: { id: id } });
    if (response.status === 200) {
      const productData = response.data.data;
      setProductDetail({
        title: productData.title,
        brand: productData.brand,
        description: productData.description,
        price: productData.price,
        rating: productData.rating,
        quantity: productData.quantity,
        discountpercentage: productData.discountpercentage,
        category_id: productData.category_id,
        image: config.baseUrl + productData.image
      });
    } else {
      toast.error("Failed to fetch product data");
    }
  };

  const handleSave = async () => {
    const {title,brand, description, price, rating, quantity, discountpercentage } = productDetail;
    const response = await baseApi({
      apiDetails: productEnd.updateProduct,
      body: {title, brand, description, price, rating, quantity, discountpercentage },
      path: { id: id }
    });
    if (response.status === 201) {
      toast.success(response.data.message);
      navigate('/admin/view');
    } else {
      toast.error(response.data.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetail((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  return (
    <Container sx={{ marginBottom: "40px", marginTop: "1px", marginLeft: "300px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography sx={{ marginTop: "20px", fontSize: 30 }}>
          <InventoryIcon /> Edit Product
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<CheckIcon />}
          sx={{
            marginTop: "20px",
            borderRadius: "20px",
            padding: "10px 20px",
          }}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#f0f0f0",
              padding: 2,
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography sx={{ color: "black", fontWeight: "bold" }} variant="h6" gutterBottom>
              General Information
            </Typography>
            <Typography sx={{ color: "black", fontWeight: "bold" }}>Title</Typography>
            <TextField
              size="small"
              name="title"
              variant="outlined"
              sx={{
                bgcolor: "lightgrey",
                marginBottom: 2,
                marginTop: "10px",
                borderRadius: 2,
                width: "500px",
                marginRight: "20px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              value={productDetail.title}
              onChange={handleInputChange}

            />
            <Typography sx={{ color: "black", fontWeight: "bold" }}>Brand</Typography>
            <TextField
              size="small"
              name="brand"
              variant="outlined"
              sx={{
                bgcolor: "lightgrey",
                marginBottom: 2,
                marginTop: "10px",
                borderRadius: 2,
                width: "500px",
                marginRight: "20px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              value={productDetail.brand}
              onChange={handleInputChange}
              
            />
            <Typography sx={{ color: "black", fontWeight: "bold" }}>Rating</Typography>
            <TextField
              size="small"
              name="rating"
              variant="outlined"
              sx={{
                bgcolor: "lightgrey",
                marginBottom: 2,
                marginTop: "10px",
                borderRadius: 2,
                width: "500px",
                marginRight: "20px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              value={productDetail.rating}
              onChange={handleInputChange}
            />
            <Typography sx={{ color: "black", fontWeight: "bold" }}>Description Product</Typography>
            <TextField
              name="description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              sx={{
                bgcolor: "lightgrey",
                marginBottom: 2,
                marginTop: "10px",
                borderRadius: 2,
                width: "500px",
                marginRight: "20px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              value={productDetail.description}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ backgroundColor: "#f0f0f0", padding: 2, borderRadius: 2 }}>
            <Typography sx={{ color: "black", fontWeight: "bold" }} variant="h6" gutterBottom>
              Pricing and Stock
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ color: "black", fontWeight: "bold" }}>Base Pricing</Typography>
                <TextField
                  size="small"
                  name="price"
                  variant="outlined"
                  fullWidth
                  sx={{
                    bgcolor: "lightgrey",
                    marginBottom: 2,
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                  value={productDetail.price}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ color: "black", fontWeight: "bold" }}>Stock</Typography>
                <TextField
                  size="small"
                  name="quantity"
                  variant="outlined"
                  fullWidth
                  sx={{
                    bgcolor: "lightgrey",
                    marginBottom: 2,
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                  value={productDetail.quantity}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ color: "black", fontWeight: "bold" }}>Discount</Typography>
                <TextField
                  size="small"
                  name="discountpercentage"
                  variant="outlined"
                  sx={{
                    bgcolor: "lightgrey",
                    marginBottom: 2,
                    borderRadius: 2,
                    width: "250px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                  value={productDetail.discountpercentage}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#f0f0f0",
              padding: 2,
              borderRadius: 2,
              mb: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "black", fontWeight: "bold" }} variant="h6" gutterBottom>
              Upload Image
            </Typography>
            <Box
              component="img"
              sx={{
                bgcolor: "lightgrey",
                marginBottom: 2,
                marginTop: "10px",
                borderRadius: 2,
                maxHeight: 380,
                maxWidth: "500px",
                marginRight: "20px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              src={productDetail.image}
              alt="Image Preview"
            />
          </Box>
          <Box sx={{ backgroundColor: "#f0f0f0", padding: 2, borderRadius: 2 }}>
            <Typography sx={{ color: "black", fontWeight: "bold" }} variant="h6" gutterBottom>
              Category
            </Typography>
            <Typography sx={{ color: "black", fontWeight: "bold" }}>Product Category</Typography>
            <TextField
              size="small"
              name="category"
              variant="outlined"
              sx={{
                bgcolor: "lightgrey",
                marginBottom: 2,
                marginTop: "10px",
                borderRadius: 2,
                width: "500px",
                marginRight: "20px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              value={productDetail.category_id}
              disabled
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditProduct;
