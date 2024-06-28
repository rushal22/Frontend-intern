import React, { useEffect, useState } from "react";
import { Container, Typography, styled, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import baseApi from "../../apibase-endpoint/apiBase";
import { productEnd } from "../../apibase-endpoint/apiEndpoint";
import CardComponent from "../shared/cards/Card";
import toast from "react-hot-toast";

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q");
  const [products, setProducts] = useState(null); // Initialize with null to differentiate between no results and loading state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      fetchProducts();
    }
  }, [query]);

  const fetchProducts = () => {
    setLoading(true);
    setProducts(null); // Clear previous results
    baseApi({ apiDetails: productEnd.searchProduct, query: { keyword: query } })
      .then((res) => {
        setLoading(false);
        if (res?.status === 200) {
          const resData = res.data;
          setProducts(resData.products);
        } else if (res.status === 404) {
          toast.error(res.data.message);
          setProducts([]); // Set empty array to indicate no results
        } else {
          toast.error(`Something went wrong`);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error:", error);
        toast.error(`Something went wrong`);
      });
  };

  return (
    <Container sx={{ maxWidth: "100%" }}>
      {query && (
        <Typography sx={{ marginTop: "80px" }} variant="h4">
          Search Results For: {query}
        </Typography>
      )}
      {loading && <Typography>Loading...</Typography>}
      {!loading && products && products.length > 0 && <CardComponent data={products} />}
      {!loading && products && products.length === 0 && (
        <Typography>No results found for your search.</Typography>
      )}
    </Container>
  );
};

export default SearchPage;
