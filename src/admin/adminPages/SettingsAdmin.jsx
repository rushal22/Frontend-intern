import React, { useEffect, useState } from "react";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, IconButton, Select, MenuItem, TextField } from "@mui/material";
import { Edit as EditIcon, Save as SaveIcon } from "@mui/icons-material";
import baseApi from "../../apibase-endpoint/apiBase";
import { userEnd } from "../../apibase-endpoint/apiEndpoint";
import '../../assets/css/main.css';
import toast from "react-hot-toast";

const AdminManagement = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [role, setRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [originalUserInfo, setOriginalUserInfo] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [paginationLinks, setPaginationLinks] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async (page) => {
    try {
      const response = await baseApi({ apiDetails: userEnd.adminManagement, query:{page: page}});
      console.log(response);
      if (response.status === 200) {
        setUserInfo(response.data.data.data);
        setOriginalUserInfo(response.data.data.data); // Store original data for resetting search
        setPaginationLinks(response.data.data.links)
      } else {
        toast.error(response.data.message || 'Failed to fetch admins');
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast.error('Failed to fetch admins');
    }
  };

  const handleEdit = (idx, currentRole) => {
    setEditIdx(idx);
    setRole(currentRole);
  };

  const handleSave = async (index) => {
    const response = await baseApi({
      apiDetails: userEnd.editAdminManagement,
      body: { role: role },
      path: { id: userInfo[index].id },
    });
    if (response.status === 200) {
      toast.success(response.data.message);
      // Update user info after successful save
      const updatedUserInfo = [...userInfo];
      updatedUserInfo[index].role = role;
      setUserInfo(updatedUserInfo);
      setEditIdx(-1); // Exit edit mode
    } else {
      toast.error(response.data.errors);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set a new timeout
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(value);
    }, 200); // Adjust delay as needed

    setSearchTimeout(timeout);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearchTerm.trim() === "") {
        setUserInfo(originalUserInfo);
      } else {
        try {
          const response = await baseApi({
            apiDetails: userEnd.userSearch,
            query: { keyword: debouncedSearchTerm }
          });
          if (response.status === 200) {
            setUserInfo(response.data.users);
          } else {
            toast.error(response.data.message);
            setUserInfo([]);
          }
        } catch (error) {
          console.error('Error searching users:', error);
          toast.error('Failed to search users');
        }
      }
    };

    fetchSearchResults();
  }, [debouncedSearchTerm, originalUserInfo]);

  const handlePageChange = (url) => {
    if (url) {
      const urlParams = new URLSearchParams(new URL(url).search);
      const page = urlParams.get('page');
      fetchAdmins(page);
    }
  };

  return (
    <Box className="table-container" sx={{ marginLeft: "300px", marginTop: "40px", marginBottom: "50px" }}>
      <TextField
        label="Search..."
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        sx={{ marginBottom: "10px" }}
      />
      <TableContainer component={Paper}>
        <Table aria-label="users table" className="table">
          <TableHead className="table-head">
            <TableRow>
              <TableCell className="table-cell" style={{ minWidth: 50 }}>ID</TableCell>
              <TableCell className="table-cell" style={{ minWidth: 100 }}>First Name</TableCell>
              <TableCell className="table-cell" style={{ minWidth: 100 }}>Last Name</TableCell>
              <TableCell className="table-cell" style={{ minWidth: 150 }}>Email</TableCell>
              <TableCell className="table-cell" style={{ minWidth: 100 }}>Role</TableCell>
              <TableCell className="table-cell" style={{ minWidth: 100 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userInfo.map((userinfo, idx) => (
              <TableRow key={userinfo.id}>
                <TableCell>{userinfo.id}</TableCell>
                <TableCell>{userinfo.firstName}</TableCell>
                <TableCell>{userinfo.lastName}</TableCell>
                <TableCell>{userinfo.email}</TableCell>
                <TableCell>
                  {editIdx === idx ? (
                    <div style={{ minWidth: 80 }}>
                      <Select
                        size="small"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                      >
                        <MenuItem value="admin">admin</MenuItem>
                        <MenuItem value="user">user</MenuItem>
                      </Select>
                    </div>
                  ) : (
                    userinfo.role
                  )}
                </TableCell>
                <TableCell>
                  {editIdx === idx ? (
                    <IconButton onClick={() => handleSave(idx)}>
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleEdit(idx, userinfo.role)}>
                      <EditIcon />
                    </IconButton>
                  )}
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
    </Box>
  );
};

export default AdminManagement;
