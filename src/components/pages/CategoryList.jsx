import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Breadcrumbs, Link, Typography, Grid, Paper, FormControl, InputLabel, Select, MenuItem, TextField, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import baseApi from "../../apibase-endpoint/apiBase"; // Adjust the import based on your project structure
import { category } from "../../apibase-endpoint/apiEndpoint"; // Adjust the import based on your project structure
import CardComponent from "../shared/cards/Card"; // Adjust the import based on your project structure
import Loadingpage from "../shared/features/Loadingpage";

const CategoryList = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brandFilters, setBrandFilters] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [ratingFilter, setRatingFilter] = useState(null);

  useEffect(() => {
    fetchCategoryProducts();
  }, [id, brandFilters, minPrice, maxPrice, ratingFilter]);

  const fetchCategoryProducts = async () => {
    try {
      const response = await baseApi({
        apiDetails: category.subCategoryItem,
        path: { category: id },
        query: {
          brands: brandFilters,
          minPrice: minPrice,
          maxPrice: maxPrice,
          rating: ratingFilter
        }
      });
      console.log(response);
      if (response.status === 200) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching category products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBrandFilterChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setBrandFilters((prevFilters) => [...prevFilters, value]);
    } else {
      setBrandFilters((prevFilters) => prevFilters.filter((filter) => filter !== value));
    }
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleRatingFilterChange = (event) => {
    setRatingFilter(event.target.value === "" ? null : parseInt(event.target.value));
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Loadingpage />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ mb: 2 , ml: 55 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Category List</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, mt:-5}}>
            <Typography variant="h6" gutterBottom>Filters</Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControl sx={{ mb: 2 }}>
                <Typography sx={{ mb: 1 }}>Brand</Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={brandFilters.includes("Brand1")} onChange={handleBrandFilterChange} value="Brand1" />}
                    label="Brand1"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={brandFilters.includes("Brand2")} onChange={handleBrandFilterChange} value="Brand2" />}
                    label="Brand2"
                  />
                  {/* Add more brands as needed */}
                </FormGroup>
              </FormControl>
              <FormControl sx={{ mb: 2 }}>
                <Typography sx={{ mb: 1 }}>Price Range</Typography>
                <TextField
                  margin="normal"
                  id="min-price"
                  label="Min Price"
                  type="number"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  margin="normal"
                  id="max-price"
                  label="Max Price"
                  type="number"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <FormControl sx={{ mb: 2 }}>
                <Typography sx={{ mb: 1 }}>Rating</Typography>
                <Select
                  labelId="rating-filter-label"
                  id="rating-filter"
                  value={ratingFilter || ""}
                  onChange={handleRatingFilterChange}
                  fullWidth
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value={5}>5 stars</MenuItem>
                  <MenuItem value={4}>4 stars</MenuItem>
                  <MenuItem value={3}>3 stars</MenuItem>
                  <MenuItem value={2}>2 stars</MenuItem>
                  <MenuItem value={1}>1 star</MenuItem>
                </Select>
              </FormControl>
              {/* Add more filters as needed */}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <CardComponent data={products} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryList;
