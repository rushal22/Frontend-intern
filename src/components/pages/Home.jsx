import React, { useEffect, useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import Card from "../../components/shared/cards/Card";
import Loadingpage from "../../components/shared/features/Loadingpage";
import baseApi from "../../apibase-endpoint/apiBase";
import { productEnd } from "../../apibase-endpoint/apiEndpoint";
import Categories from "../shared/features/Categories";
import Banner from "../shared/Banner/Banner";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const PRODUCTS_PER_LOAD = 8;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await baseApi({
        apiDetails: productEnd.allProduct,
      });
      if (response.status === 200) {
        setProducts(response.data.data);
        setDisplayedProducts(response.data.data.slice(0, PRODUCTS_PER_LOAD));
        setAllProductsLoaded(response.data.data.length <= PRODUCTS_PER_LOAD);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setLoadMoreLoading(true);
    const nextProducts = products.slice(
      displayedProducts.length,
      displayedProducts.length + PRODUCTS_PER_LOAD
    );
    setDisplayedProducts((prevProducts) => [...prevProducts, ...nextProducts]);
    setAllProductsLoaded(
      displayedProducts.length + nextProducts.length >= products.length
    );
    setLoadMoreLoading(false);
  };

  if (loading) {
    return <Loadingpage />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ maxWidth: "1200px", width: "100%", marginTop: "-90px" }}
      >
        {/* Categories and Banner on the top */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <Box sx={{ marginTop: "90px", paddingRight: "16px" }}>
                <Categories />
              </Box>
            </Grid>
            <Grid item xs={12} md={10}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  paddingLeft: "16px",
                }}
              >
                <Banner />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Cards below Categories and Banner */}
        <Grid item xs={12}>
          <Card data={displayedProducts} />
        </Grid>

        {/* Load More Button */}
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          {!allProductsLoaded && (
            <Button
              variant="outlined"
              onClick={handleLoadMore}
              disabled={loadMoreLoading}
            >
              {loadMoreLoading ? "Loading..." : "Load More"}
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
