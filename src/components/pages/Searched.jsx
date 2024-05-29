import React, { useEffect, useState } from "react";
import { Container, Typography, styled } from "@mui/material";
import { useLocation } from "react-router-dom";
import baseApi from "../../apibase-endpoint/apiBase";
import { productEnd } from "../../apibase-endpoint/apiEndpoint";
import CardComponent from "../shared/cards/Card";
import toast from "react-hot-toast";

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q");
  const [products, setProducts] = useState();

  useEffect(() => {
    if (query) {
      fetchProducts();
    }
  }, [query]);

  const fetchProducts = () => {
    baseApi({ apiDetails: productEnd.searchProduct, query: { keyword: query } })
      .then((res) => {
        if (res?.status === 200) {
          const resData = res.data;
          setProducts(resData.products);
        } else if (res.status === 404) {
          toast.error(res.data.message);
        } else {
          toast.error(`Something went wrong`);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <Container sx={{ maxWidth: "100%" }}>
      {query && (
        <Typography sx={{marginTop: "80px" }} variant="h4">Search Results For: {query}</Typography>
      )}
      {products && <CardComponent data={products} />}
    </Container>
  );
};

export default SearchPage;
