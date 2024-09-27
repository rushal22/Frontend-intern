import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import baseApi from "../../apibase-endpoint/apiBase";
import { orderEnd } from "../../apibase-endpoint/apiEndpoint";
import { format, subDays, startOfToday, startOfYesterday } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Order Status",
    },
  },
};
const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 500,
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    title: {
      display: true,
      text: "Delivered Orders by Month",
      font: {
        size: 20,
      },
    },
  },
  animation: {
    duration: 3000,
    easing: "linear",
  },
};
const barData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Delivered Orders",
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: "#4caf50",
    },
  ],
};

const AdminOrderChart = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [doughnutData, setDoughnutData] = useState({
    labels: ["Delivered", "Pending", "Canceled"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ["#4caf50", "#f44336", "purple"],
        borderColor: ["#4caf50", "#f44336", "purple"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await baseApi({ apiDetails: orderEnd.adminOrder });
        if (response.status === 200) {
          const sortedOrders = response.data.orders.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setOrders(sortedOrders);
          setFilteredOrders(sortedOrders);
          const deliveredOrders = sortedOrders.filter(order => order.status === "delivered").length;
          const pendingOrders = sortedOrders.filter(order => order.status === "pending").length;
          const canceledOrders = sortedOrders.filter(order => order.status === "canceled").length;
          setDoughnutData({
            labels: ["Delivered", "Pending", "Canceled"],
            datasets: [
              {
                data: [deliveredOrders, pendingOrders, canceledOrders],
                backgroundColor: ["#4caf50", "#ffa726", "#f44336"],
                borderColor: ["#4caf50", "#ffa726", "#f44336"],
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const filterOrders = () => {
      let filtered = orders;

      if (statusFilter !== "All") {
        filtered = filtered.filter((order) => order.status === statusFilter);
      }

      const today = startOfToday();
      const yesterday = startOfYesterday();

      if (dateFilter === "Today") {
        filtered = filtered.filter(
          (order) => new Date(order.created_at) >= today
        );
      } else if (dateFilter === "Yesterday") {
        filtered = filtered.filter(
          (order) =>
            new Date(order.created_at) >= yesterday &&
            new Date(order.created_at) < today
        );
      } else if (dateFilter === "2 days ago") {
        const twoDaysAgo = subDays(today, 3);
        filtered = filtered.filter(
          (order) =>
            new Date(order.created_at) >= twoDaysAgo &&
            new Date(order.created_at) < yesterday
        );
      } else if (dateFilter === "Week ago") {
        const weekAgo = subDays(today, 7);
        filtered = filtered.filter(
          (order) => new Date(order.created_at) >= weekAgo
        );
      }

      setFilteredOrders(filtered);
    };

    filterOrders();
  }, [statusFilter, dateFilter, orders]);

  return (
    <Box sx={{ mt: 4, ml: 30 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          mb: 4,
        }}
      >
        <Paper sx={{ width: "45%", height: "350px", p: 2 }}>
          <Bar data={barData} options={barOptions} />
        </Paper>
        <Paper sx={{ width: "35%", height: "350px", p: 4 }}>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </Paper>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Box sx={{gap: 1, ml: 20}}>
          <Button
            onClick={() => setStatusFilter("All")}
            sx={{
              color: statusFilter === "All" ? "black" : "grey.500",
              bgcolor: statusFilter === "All" ? "grey.100" : "transparent",
              fontWeight: statusFilter === "All" ? "bold" : "normal",
              textDecoration: statusFilter === "All" ? "underline" : "none",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            All
          </Button>
          <Button
            onClick={() => setStatusFilter("pending")}
            sx={{
              color: statusFilter === "pending" ? "black" : "grey.500",
              bgcolor: statusFilter === "pending" ? "grey.100" : "transparent",
              fontWeight: statusFilter === "pending" ? "bold" : "normal",
              textDecoration:
                statusFilter === "pending" ? "underline" : "none",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            Pending
          </Button>
          <Button
            onClick={() => setStatusFilter("delivered")}
            sx={{
              color: statusFilter === "delivered" ? "black" : "grey.500",
              bgcolor:
                statusFilter === "delivered" ? "grey.100" : "transparent",
              fontWeight: statusFilter === "delivered" ? "bold" : "normal",
              textDecoration:
                statusFilter === "delivered" ? "underline" : "none",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            Delivered
          </Button>
          
          <Button
            onClick={() => setStatusFilter("canceled")}
            sx={{
              color: statusFilter === "canceled" ? "black" : "grey.500",
              bgcolor: statusFilter === "canceled" ? "grey.100" : "transparent",
              fontWeight: statusFilter === "canceled" ? "bold" : "normal",
              textDecoration:
                statusFilter === "canceled" ? "underline" : "none",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            Canceled
          </Button>
          </Box>
        <FormControl sx={{ mr: 9, width: 200 }}>
          <InputLabel>Date Filter</InputLabel>
          <Select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            label="Date Filter"
          >
            <MenuItem value="Today">Today</MenuItem>
            <MenuItem value="Yesterday">Yesterday</MenuItem>
            <MenuItem value="2 days ago">2 days ago</MenuItem>
            <MenuItem value="Week ago">Week ago</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "left",
          mb: 1,
          ml: 20,
        }}
      >
        Recent Orders
      </Typography>
      <TableContainer component={Paper} sx={{ ml: 20, width: "80%", mb: 10 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead className="table-head">
            <TableRow>
              <TableCell
                style={{ minWidth: "70px", textAlign: "center" }}
              >
                Order ID
              </TableCell>
              <TableCell
                style={{ minWidth: "150px", textAlign: "center" }}
              >
                Customer Name
              </TableCell>
              <TableCell
                style={{ minWidth: "150px", textAlign: "center" }}
              >
                Status
              </TableCell>
              <TableCell
                style={{ minWidth: "100px", textAlign: "center" }}
              >
                Total Price
              </TableCell>
              <TableCell
                style={{ minWidth: "150px", textAlign: "center" }}
              >
                Created At
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.slice(0, 7).map((order) => (
              <TableRow key={order.id}>
                <TableCell style={{ textAlign: "center" }}>
                  {order.id}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                {`${order.user.firstName} ${
                    order.user.lastName
                  }`}{" "}
                  ({order.user.email})
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    color:
                      order.status === "delivered"
                        ? "#4caf50"
                        : order.status === "pending"
                        ? "#ff9800"
                        : "#f44336",
                  }}
                >
                  {order.status}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {order.total_price}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {format(new Date(order.created_at), "yyyy-MM-dd HH:mm:ss")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminOrderChart;
