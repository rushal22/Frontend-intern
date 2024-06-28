import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from "@mui/material";
import { config } from "../../helper/config";
import "../../assets/css/main.css";
import { MoreVert as MoreVertIcon, Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/shared/Buttons/Button";
import baseApi from "../../apibase-endpoint/apiBase";
import { productEnd } from "../../apibase-endpoint/apiEndpoint";
import toast from "react-hot-toast";
import Loadingpage from "../../components/shared/features/Loadingpage";

const TableComponent = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(1); // Fetch initial data for the first page
  }, []);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await baseApi({
        apiDetails: productEnd.adminAllProduct,
        query: { page: page }
      });
      console.log(response);
      if (response.status === 200) {
        setProducts(response.data.data.data);
        setPaginationLinks(response.data.data.links);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching products:', error);
    }
  };

  const handleOpenMenu = (event, productId) => {
    document.body.classList.add("overflow-auto");
    setAnchorEl(event.currentTarget);
    setSelectedProductId(productId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleUpdate = (productId) => {
    navigate(`/admin/${productId}`);
    handleCloseMenu();
  };

  const handleRemove = () => {
    setDeleteDialogOpen(true);
    handleCloseMenu();
  };

  const handleConfirmDelete = async () => {
    const response = await baseApi({
      apiDetails: productEnd.deleteProduct,
      path: { id: selectedProductId }
    });
    console.log(response);
    if (response.status === 200) {
      toast.success(response.data.message);
      fetchData(1); // Refresh the data after deletion
    } else {
      toast.error(response.data.message);
    }
    setDeleteDialogOpen(false);
  };

  const handleCreateNew = () => {
    navigate('/admin/create');
  };

  const handlePageChange = (url) => {
    if (url) {
      const urlParams = new URLSearchParams(new URL(url).search);
      const page = urlParams.get('page');
      fetchData(page);
    }
  };

  if (loading) {
    return <Loadingpage />;
  }

  return (
    <Box className="table-container" sx={{ marginLeft: "300px", marginTop: "20px", marginBottom: "50px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
        >
          Create New 
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="products table" className="table">
          <TableHead className="table-head">
            <TableRow>
              <TableCell className="table-cell" style={{minWidth: 50}}>ProductID</TableCell>
              <TableCell className="table-cell" style={{minWidth: 100}}>Image</TableCell>
              <TableCell className="table-cell" style={{minWidth: 100}}>Category</TableCell>
              <TableCell className="table-cell" style={{minWidth: 150}}>Title</TableCell>
              <TableCell className="table-cell" style={{minWidth: 100}}>Brand</TableCell>
              <TableCell className="table-cell" style={{minWidth: 100}}>Discount</TableCell>
              <TableCell className="table-cell" style={{minWidth: 100}}>Rating</TableCell>
              <TableCell className="table-cell" style={{minWidth: 150}}>Price</TableCell>
              <TableCell className="table-cell" style={{minWidth: 100}}>Stock</TableCell>
              <TableCell className="table-cell" style={{minWidth: 100}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <img
                    src={config.baseUrl + product.image}
                    alt={product.title}
                    className="product-image"
                  />
                </TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>
                  {product.discountpercentage
                    ? `${product.discountpercentage} %`
                    : "-"}
                </TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell>{`Rs. ${product.price}`}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <IconButton
                    className="action-button"
                    aria-controls="product-actions-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleOpenMenu(event, product.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="product-actions-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl && selectedProductId === product.id)}
                    onClose={handleCloseMenu}
                    sx={{ position: "absolute" }}
                  >
                    <MenuItem className="menu-item" onClick={() => handleUpdate(product.id)}>
                      <EditIcon sx={{ color: "#00A1F5" }} />
                    </MenuItem>
                    <CustomButton type="delete" onClick={handleRemove} />
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        {paginationLinks.map((link, index) => (
          <Button
            key={index}
            disabled={!link.url}    
            onClick={() => handlePageChange(link.url)}
            sx={{ 
              mx: 0.5, 
              color: link.active ? "primary.main" : "inherit", 
              backgroundColor: link.active ? "rgba(0, 0, 0, 0.08)" : "transparent",
              '&:hover': {
                backgroundColor: link.active ? "rgba(0, 0, 0, 0.08)" : "rgba(0, 0, 0, 0.04)"
              }
            }}
          >
            {link.label.replace("&laquo;", "«").replace("&raquo;", "»")}
          </Button>
        ))}
      </Box>
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Remove the Product</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            sx={{ backgroundColor: "#f44336", color: "#fff" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TableComponent;
