import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import baseApi from "../../apibase-endpoint/apiBase"; // Adjust the import based on your project structure
import { category } from "../../apibase-endpoint/apiEndpoint"; // Adjust the import based on your project structure
import CardComponent from "../shared/cards/Card"; // Adjust the import based on your project structure

const CategoryList = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryProducts();
  }, [id]);

  const fetchCategoryProducts = async () => {
    try {
      const response = await baseApi({ apiDetails: category.subCategoryItem, path: { category: id } });
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

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <CardComponent data={products} />
    </Box>
  );
};

export default CategoryList;
