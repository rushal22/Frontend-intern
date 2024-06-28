import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemText, Paper } from "@mui/material";
import baseApi from "../../../apibase-endpoint/apiBase"; // Adjust the import based on your project structure
import { category } from "../../../apibase-endpoint/apiEndpoint"; // Adjust the import based on your project structure
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [subcategoryBoxPosition, setSubcategoryBoxPosition] = useState({
    top: 0,
    left: 0,
  });
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await baseApi({ apiDetails: category.categoryList });
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryHover = (category, event) => {
    setHoveredCategory(category);
    const rect = event.currentTarget.getBoundingClientRect();
    setSubcategoryBoxPosition({
      top: rect.top + window.scrollY,
      left: rect.right + 10,
    });
  };

  const handleSubcategoryLeave = () => {
    setHoveredCategory(null);
  };

  const handleCategoryClick = async (categoryId) => {
    try {
      const res = await baseApi({
        apiDetails: category.subCategoryItem,
        path: { category: categoryId },
      });
      if (res.status === 200) {
        navigate(`/category/${categoryId}`);
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error fetching category items:", error);
    }
  };

  // Update dark mode state based on local storage change
  useEffect(() => {
    const handleLocalStorageChange = () => {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    };

    window.addEventListener("storage", handleLocalStorageChange);

    return () => {
      window.removeEventListener("storage", handleLocalStorageChange);
    };
  }, []);

  return (
    <Box>
      <Box sx={{ position: "relative" }}>
        <Paper
          sx={{
            width: "200px", // Adjust width
            boxShadow: "0px 0px 20px rgba(0,0,0,0)",
            borderRadius: 2,
            overflowY: "auto",
            maxHeight: "400px",
            "&:hover": {
              boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
            },
            bgcolor: darkMode ? "#333" : "#fff", // Background color based on darkMode
            color: darkMode ? "#fff" : "#333", // Text color based on darkMode
          }}
        >
          <List component="nav">
            {categories.map((category) => (
              <ListItem
                button
                key={category.id}
                onMouseEnter={(event) => handleCategoryHover(category, event)}
                onClick={() =>
                  !category.children || category.children.length === 0
                    ? handleCategoryClick(category.id)
                    : null
                }
                sx={{
                  "&:hover": {
                    backgroundColor: darkMode ? "#444" : "#f5f5f5", // Hover background color based on darkMode
                    color: darkMode ? "#fff" : "red", // Text color changes to red on hover
                  },
                }}
              >
                <ListItemText
                  primary={category.name}
                  primaryTypographyProps={{
                    style: { fontSize: "11px", color: darkMode?"white": "#757E8B" },
                  }} // Set text size and color
                />
                {category.children && category.children.length > 0 && (
                  <ArrowRightIcon
                    style={{
                      visibility:
                        hoveredCategory === category ? "visible" : "hidden",
                    }}
                  /> // Show arrow on hover
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      {hoveredCategory &&
        hoveredCategory.children &&
        hoveredCategory.children.length > 0 && (
          <Box
            onMouseLeave={handleSubcategoryLeave}
            sx={{
              position: "absolute",
              top: subcategoryBoxPosition.top,
              left: subcategoryBoxPosition.left,
              width: "170px",
              boxShadow: 2,
              borderRadius: 2,
              bgcolor: darkMode ? "#333" : "#f5f5f5", // Subcategory box background color based on darkMode
              color: darkMode ? "#f4f4f4" : "#333", // Subcategory box text color based on darkMode
              overflowY: "auto",
              zIndex: 1, // Ensure subcategory box appears above other elements
            }}
          >
            <Paper>
              <List
                sx={{
                  bgcolor: darkMode ? "#333" : "white",
                  color: darkMode ? "#f4f4f4" : "#333",
                }}
                component="nav"
              >
                {hoveredCategory.children.map((subcategory) => (
                  <ListItem
                    button
                    key={subcategory.id}
                    onClick={() => handleCategoryClick(subcategory.id)}
                    sx={{
                      "&:hover": {
                        backgroundColor: darkMode ? "#444" : "#f5f5f5",
                      },
                    }} // Add hover effect
                  >
                    <ListItemText
                      primary={subcategory.name}
                      primaryTypographyProps={{
                        style: { fontSize: "11px", color: darkMode?"white": "#757E8B" },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )}
    </Box>
  );
};

export default Categories;
