import React, { useEffect, useState } from "react";
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
  TextField,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import {
  AllInbox as AllInboxIcon,
  LocalShipping as LocalShippingIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import baseApi from "../../apibase-endpoint/apiBase";
import { orderEnd } from "../../apibase-endpoint/apiEndpoint";
import toast from "react-hot-toast";

const OrderAdmin = () => {
  const [orders, setOrders] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalOrders, setTotalOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [canceledOrders, setCanceledOrders] = useState(0);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const response = await baseApi({ apiDetails: orderEnd.adminOrder });
      if (response.status === 200) {
        const sortedOrders = response.data.orders.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setOrders(sortedOrders);
        calculateOrderStatistics(sortedOrders);
      }
    };
    fetchData();
  }, []);

  const calculateOrderStatistics = (orders) => {
    setTotalOrders(orders.length);
    setDeliveredOrders(
      orders.filter((order) => order.status === "delivered").length
    );
    setPendingOrders(
      orders.filter((order) => order.status === "pending").length
    );
    setCanceledOrders(
      orders.filter((order) => order.status === "canceled").length
    );
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    const response = await baseApi({
      apiDetails: {
        ...orderEnd.updateOrderStatus,
        url: orderEnd.updateOrderStatus.url.replace(":id", orderId),
      },
      body: { status: newStatus },
    });
    if (response.status === 200) {
      toast.success("Order status updated successfully");
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      calculateOrderStatistics(updatedOrders);
    } else {
      toast.error("Failed to update order status");
    }
  };

  const filteredOrders = orders
    ? orders.filter(
        (order) =>
          (order.user.firstName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            order.user.lastName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            order.user.email
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) &&
          (filter === "all" || order.status === filter)
      )
    : [];

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  if (!orders) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#F6F6F6",
        marginTop: "5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "60%",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h5">
          Orders
        </Typography>
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search orders"
          variant="outlined"
          size="small"
        />
      </Box>

      <Grid
        container
        spacing={2}
        sx={{ width: "60%", marginTop: "20px", marginBottom: "20px" }}
      >
        <Grid item xs={6} md={3}>
          <Card
            onClick={() => handleFilterChange("all")}
            sx={{
              "&:hover": {
                boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
              },
              bgcolor: "#93C9F7",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              height: "100%",
              boxShadow: "0px 0px 20px rgba(0,0,0,0)"
            }}
          >
            <CardContent
              sx={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <AllInboxIcon
                sx={{ color: "#214162", width: "50px", fontSize: 50 }}
              />
              <Box sx={{ marginLeft: 1 }}>
                <Typography variant="h4">{totalOrders}</Typography>
                <Typography sx={{fontStyle: "italic"}} variant="h7">Total Orders</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card
            onClick={() => handleFilterChange("delivered")}
            sx={{
              "&:hover": {
                boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
              },
              bgcolor: "#FE9E9F",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              height: "100%",
              boxShadow: "0px 0px 20px rgba(0,0,0,0)"
            }}
          >
            <CardContent
              sx={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <LocalShippingIcon
                sx={{ color: "#008000", width: "50px", fontSize: 50 }}
              />
              <Box sx={{ marginLeft: 1 }}>
                <Typography variant="h4">{deliveredOrders}</Typography>
                <Typography sx={{fontStyle: "italic"}} variant="h7">Delivered Orders</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card
            onClick={() => handleFilterChange("pending")}
            sx={{
              "&:hover": {
                boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
              },
              bgcolor: "#FFC19E",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              height: "100%",
              boxShadow: "0px 0px 20px rgba(0,0,0,0)"
            }}
          >
            <CardContent
              sx={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <HourglassEmptyIcon
                sx={{ color: "brown", width: "50px", fontSize: 50 }}
              />
              <Box sx={{ marginLeft: 1 }}>
                <Typography variant="h4">{pendingOrders}</Typography>
                <Typography sx={{fontStyle: "italic"}} variant="h7">Pending Orders</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card
            onClick={() => handleFilterChange("canceled")}
            sx={{
              "&:hover": {
                boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
              },
              bgcolor: "#AC9EFF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              height: "100%",
              boxShadow: "0px 0px 20px rgba(0,0,0,0)"
            }}
          >
            <CardContent
              sx={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <CancelIcon
                sx={{ color: "#E50E1A", width: "50px", fontSize: 50 }}
              />
              <Box sx={{ marginLeft: 1 }}>
                <Typography variant="h4">{canceledOrders}</Typography>
                <Typography sx={{fontStyle: "italic"}} variant="h7">Canceled Orders</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ width: "60%", marginBottom: "20px", boxShadow: "0px 0px 20px rgba(0,0,0,0)" }}>
        <Box sx={{ mt: 2}}>
          <Typography
            sx={{ textAlign: "left", fontWeight: "bold", ml: 2 }}
            variant="h6"
            gutterBottom
          >
            All Orders
          </Typography>
          <TableContainer>
            <Table aria-label="orders table">
              <TableHead className="table-head">
                <TableRow>
                  <TableCell style={{ minWidth: 100, fontWeight: "bold" }}>
                    Order ID
                  </TableCell>
                  <TableCell style={{ minWidth: 150, fontWeight: "bold" }}>
                    Order Date
                  </TableCell>
                  <TableCell style={{ minWidth: 150, fontWeight: "bold" }}>
                    Customer Name
                  </TableCell>
                  <TableCell style={{ minWidth: 100, fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell style={{ minWidth: 120, fontWeight: "bold" }}>
                    Total Price
                  </TableCell>
                  <TableCell style={{ minWidth: 150, fontWeight: "bold" }}>
                    Update Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {`${order.user.firstName} ${order.user.lastName}`} (
                      {order.user.email})
                    </TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>Rs. {order.total_price}</TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onChange={(e) =>
                          handleUpdateOrderStatus(order.id, e.target.value)
                        }
                        displayEmpty
                        sx={{
                          boxShadow: "none",
                          ".MuiOutlinedInput-notchedOutline": { border: 0 },
                        }}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
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
    </Box>
  );
};

export default OrderAdmin;
