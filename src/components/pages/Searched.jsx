import React, { useEffect, useState } from "react";
import { Container, Typography, Chip } from "@mui/material";
import { useLocation } from "react-router-dom";
import baseApi from "../../apibase-endpoint/apiBase";
import { productEnd } from "../../apibase-endpoint/apiEndpoint";
import CardComponent from "../shared/cards/Card";
import toast from "react-hot-toast";

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q");
  
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      fetchProducts();
    }
  }, [query]);

  const fetchProducts = () => {
    setLoading(true);
    setProducts(null);
    baseApi({ apiDetails: productEnd.searchProduct, query: { keyword: query } })
      .then((res) => {
        setLoading(false);
        if (res?.status === 200) {
          const resData = res.data;
          setProducts(resData.products);
        } else if (res.status === 404) {
          setProducts([]);
        } 
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error:", error);
      });
  };

  return (
    <Container sx={{ maxWidth: "100%" }}>
      {products && (
        <Typography sx={{ marginTop: "100px", fontSize: 18 }}>
          {products.length > 0 ? (
            <>
              {products.length} items found for:{" "}
              <Chip
                label={query}
                variant="outlined"
                color="primary"
                sx={{ marginLeft: 1 }}
              />
            </>
          ) : (
            `No results found for "${query}"`
          )}
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
