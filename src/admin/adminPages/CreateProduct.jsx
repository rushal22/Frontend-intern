import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Grid,
  IconButton,
  MenuItem,
  ListSubheader,
  FormControl,
  Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import InventoryIcon from "@mui/icons-material/Inventory";
import baseApi from "../../apibase-endpoint/apiBase";
import { category, productEnd } from "../../apibase-endpoint/apiEndpoint";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [darMode , setDarkMode] = useState(localStorage.getItem('darkMode')=== 'true')
  const [imagePreview, setImagePreview] = useState(null);
  const [values, setValues] = useState({
    title: "",
    brand: "",
    category_id: "", 
    price: "",
    quantity: "",
    discountpercentage: "",
    rating: "",
    description: "",
    image: null,
  });
  const [categories, setCategories] = useState([]); // State to store categories fetched from API
  const navigate = useNavigate()


  useEffect(() => {
    fetchCategories(); 
    // handleCategorySelect()
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await baseApi({ apiDetails: category.categoryList });
      console.log(response);
      if (response.status === 200) {
        setCategories(response.data); // Set categories in state
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValues({
        ...values,
        image: file,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in values) {
      formDataToSend.append(key, values[key]);
    }

    const response = await baseApi({
      apiDetails: productEnd.addProduct,
      body: formDataToSend,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 201) {
      toast.success(response.data.message);
      navigate('/admin/view')
      console.log("Response:", response);
    } else {
      toast.error(response.errors);
    }
  };
  const handleCategorySelect = (categoryId) => {
      setValues({
        ...values,
        category_id: categoryId,
      });
      console.log(categoryId);
  };
  const categoryMenuItems = categories.map((cat) => {
    if (cat.children && cat.children.length > 0) {
      return [
        <ListSubheader key={`header-${cat.id}`}>{cat.name}</ListSubheader>,
        ...cat.children.map((subcat) => (
          <MenuItem key={subcat.id} value={subcat.id}>
            {subcat.name}
          </MenuItem>
        )),
      ];
    } else {
      return (
        <MenuItem sx={{color: '#666666', fontSize: 14}} key={cat.id} value={cat.id}>
          {cat.name}
        </MenuItem>
      );
    }
  });

  return (
    <Container sx={{ paddingBottom: "100px", marginLeft: "300px" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography sx={{ marginTop: "20px", fontSize: 30 }}>
          <InventoryIcon /> Create Product
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
          onClick={handleSubmit}
        >
          Add Product
        </Button>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "white",
                padding: 2,
                borderRadius: 2,
                mb: 3,
              }}
            >
              <Typography
                sx={{ color: "black", fontWeight: "bold" }}
                variant="h6"
                gutterBottom
              >
                General Information
              </Typography>
              <Typography sx={{ color: "black", fontWeight: "bold" }}>
                Title
              </Typography>
              <div>
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
                  value={values.title}
                  onChange={(e) =>
                    setValues({ ...values, title: e.target.value })
                  }
                  required
                />
              </div>
              <Typography sx={{ color: "black", fontWeight: "bold" }}>
                Brand
              </Typography>
              <div>
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
                  value={values.brand}
                  onChange={(e) =>
                    setValues({ ...values, brand: e.target.value })
                  }
                  required
                />
              </div>
              <Typography sx={{ color: "black", fontWeight: "bold" }}>
                Rating
              </Typography>
              <div>
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
                  value={values.rating}
                  onChange={(e) =>
                    setValues({ ...values, rating: e.target.value })
                  }
                />
              </div>
              <Typography sx={{ color: "black", fontWeight: "bold" }}>
                Description Product
              </Typography>
              <div>
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
                  value={values.description}
                  onChange={(e) =>
                    setValues({ ...values, description: e.target.value })
                  }
                />
              </div>
            </Box>
            <Box sx={{ backgroundColor: "white", padding: 2, borderRadius: 2 }}>
              <Typography
                sx={{ color: "black", fontWeight: "bold" }}
                variant="h6"
                gutterBottom
              >
                Pricing and Stock
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ color: "black", fontWeight: "bold" }}>
                    Base Pricing
                  </Typography>
                  <div>
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
                      value={values.price}
                      onChange={(e) =>
                        setValues({ ...values, price: e.target.value })
                      }
                      required
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ color: "black", fontWeight: "bold" }}>
                    Stock
                  </Typography>
                  <div>
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
                      value={values.quantity}
                      onChange={(e) =>
                        setValues({ ...values, quantity: e.target.value })
                      }
                      required
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: "black", fontWeight: "bold" }}>
                    Discount
                  </Typography>
                  <div>
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
                      value={values.discountpercentage}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          discountpercentage: e.target.value,
                        })
                      }
                    />
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "white",
                padding: 2,
                borderRadius: 2,
                mb: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ color: "black", fontWeight: "bold" }}
                variant="h6"
                gutterBottom
              >
                Upload Image
              </Typography>
              {imagePreview ? (
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
                  src={imagePreview}
                  alt="Image Preview"
                />
              ) : (
                <Box
                  sx={{
                    marginTop: "20px",
                    width: 278,
                    height: 280,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px dashed grey",
                    borderRadius: 2,
                    marginBottom: 2,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    No Image Selected{"   "}
                    <Link
                      underline="always"
                      style={{ color: "blue" }}
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    >
                      Click here to browse
                    </Link>
                  </Typography>
                </Box>
              )}
              <IconButton component="label" color="primary">
                <AddIcon />
                <input  
                  id="fileInput"
                  type="file"
                  hidden
                  onChange={handleImageChange}
                  required
                />
              </IconButton>
            </Box>
            <Box sx={{ backgroundColor: "white", padding: 2, borderRadius: 2 }}>
              <Typography
                sx={{ color: "black", fontWeight: "bold" }}
                variant="h6"
                gutterBottom
              >
                Category
              </Typography>
              <Typography sx={{ color: "black", fontWeight: "bold" }}>
                Product Category
              </Typography>
                         <FormControl
                size="small"
                sx={{
                  width: "100%",
                  bgcolor: "lightgrey",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
              >
                <Select
                  value={values.category_id}
                  onChange={(e) => handleCategorySelect(e.target.value)}
                  displayEmpty
                >
                   <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categoryMenuItems}
                </Select>
              </FormControl>

            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateProduct;
