import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Box,
} from '@mui/material';
import baseApi from '../../apibase-endpoint/apiBase';
import { orderEnd } from '../../apibase-endpoint/apiEndpoint';
import toast from 'react-hot-toast';

const OrderAdmin = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await baseApi({ apiDetails: orderEnd.adminOrder });
      console.log(response);
      if (response.status === 200) {
        setOrders(response.data.orders);
      }
    };
    fetchData();
  }, []);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    const response = await baseApi({
      apiDetails: {
        ...orderEnd.updateOrderStatus,
        url: orderEnd.updateOrderStatus.url.replace(':id', orderId),
      },
      body: { status: newStatus },
    });
    if (response.status === 200) {
      toast.success('Order status updated successfully');
      // Update local orders state with updated status
      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
    } else {
      toast.error('Failed to update order status');
    }
  };

  if (!orders) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ marginTop: '10px', bgcolor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper sx={{ width: '60%', marginBottom: '20px' }}>
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }} variant="h6" gutterBottom>
            Order Details
          </Typography>
          <TableContainer>
            <Table aria-label="orders table">
              <TableHead className='table-head'>
                <TableRow>
                  <TableCell style={{ minWidth: 100, fontWeight: 'bold' }}>Order ID</TableCell>
                  <TableCell style={{ minWidth: 150, fontWeight: 'bold' }}>Order Date</TableCell>
                  <TableCell style={{ minWidth: 100, fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell style={{ minWidth: 120, fontWeight: 'bold' }}>Total Price</TableCell>
                  <TableCell style={{ minWidth: 180, fontWeight: 'bold' }}>Shipping Address</TableCell>
                  <TableCell style={{ minWidth: 150, fontWeight: 'bold' }}>User Details</TableCell>
                  <TableCell style={{ minWidth: 150, fontWeight: 'bold' }}>Update Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>Rs. {order.total_price}</TableCell>
                    <TableCell>{order.shipping_address}</TableCell>
                    <TableCell>
                      {`${order.user.firstName} ${order.user.lastName}`} ({order.user.email})
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        displayEmpty
                        sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="shipped">Shipped</MenuItem>
                        <MenuItem value="delivered">Delivered</MenuItem>
                        <MenuItem value="canceled">Canceled</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>

      <Paper sx={{ width: '60%', marginTop: '20px', marginBottom: '20px' }}>
        <Box sx={{ mt: 2  }}>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }} variant="h6" gutterBottom>
            Product Details
          </Typography>
          <TableContainer>
            <Table aria-label="products table">
              <TableHead className='table-head'>
                <TableRow>
                  <TableCell style={{ minWidth: 50, fontWeight: 'bold' }}>Order ID</TableCell>
                  <TableCell style={{ minWidth: 50, fontWeight: 'bold' }}>Product ID</TableCell>
                  <TableCell style={{ minWidth: 50, fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell style={{ minWidth: 100, fontWeight: 'bold' }}>Brand</TableCell>
                  <TableCell style={{ minWidth: 100, fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell style={{ minWidth: 40, fontWeight: 'bold' }}>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) =>
                  order.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.pivot.quantity}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderAdmin;
