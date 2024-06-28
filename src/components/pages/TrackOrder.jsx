import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Button,
} from '@mui/material';
import baseApi from '../../apibase-endpoint/apiBase';
import { orderEnd } from '../../apibase-endpoint/apiEndpoint';
import { config } from '../../helper/config'; // Assuming you have a config file with baseUrl
import toast from 'react-hot-toast';

const TrackOrder = () => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await baseApi({ apiDetails: orderEnd.viewOrder });
      console.log(response);
      if (response.status === 200) {
        setOrderData(response.data.orders[0]); // Assuming you want the first order in the array
      }
    };
    fetchData();
  }, []);

  if (!orderData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const { id, created_at, products, shipping_address, status, total_price } = orderData;

  const handleCancelOrder = async () => {
    const cancelOrderUrl = orderEnd.cancelOrder.url.replace(':id', id);
    const response = await baseApi({ apiDetails: { ...orderEnd.cancelOrder, url: cancelOrderUrl } });
    console.log(response);
    if (response.status === 200) {
      toast.success(response.data.message);
      window.location.reload()
    } else {
      toast.error(response.data.message);
    }
  };

  // Determine if Cancel Order button should be disabled
  const isCancelButtonDisabled = status === 'canceled' || status === 'delivered' || status === 'shipped';

  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Grid container spacing={3} sx={{ maxWidth: '1200px' }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={4}
            sx={{
              padding: '20px',
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Order Details
            </Typography>
            <Divider sx={{ marginBottom: '20px' }} />
            <Typography variant="subtitle1">
              <strong>Order ID:</strong> {id}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Order Date:</strong> {new Date(created_at).toLocaleString()}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Status:</strong> {status}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Shipping Address:</strong> {shipping_address}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Total Price:</strong> Rs. {total_price}
            </Typography>
            <Button
              variant="contained"
              color="error"
              sx={{ marginTop: 2 }}
              onClick={handleCancelOrder}
              disabled={isCancelButtonDisabled}
            >
              Cancel Order
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={4}
            sx={{
              padding: '20px',
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Products
            </Typography>
            <Divider sx={{ marginBottom: '20px' }} />
            <List>
              {products.map((product) => (
                <ListItem
                  key={product.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingBottom: '20px',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.02)' },
                  }}
                >
                  <Card
                    sx={{
                      display: 'flex',
                      width: '100%',
                      borderRadius: 2,
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 151, borderRadius: '2px 0 0 2px' }}
                      image={config.baseUrl + product.image} // Assuming product.image is the image path
                      alt={product.title}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h6">
                          {product.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          Price: Rs. {product.price}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          Qty: {product.pivot.quantity}
                        </Typography>
                        {product.discountpercentage && (
                          <Typography variant="subtitle2" color="text.secondary" component="div">
                            Discount: {product.discountpercentage}%
                          </Typography>
                        )}
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                          Brand: {product.brand}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrackOrder;
