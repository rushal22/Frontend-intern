import React, { useState , useEffect} from "react";
import {Container, Paper, styled } from "@mui/material";
import CustomInputField from "../form/Textfield";
import CustomButton from "../Buttons/Button";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = styled(Paper)(({ theme }) => ({
  padding: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: 350,
  borderRadius: 25,
  boxShadow: "none",
  border: `1px solid ${theme.palette.divider}`,
}));

const Search = () => {
  const [search , setSearch] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
    setSearch('')
  };
  const handleChange = (e) => {
    setSearch(e.target.value);

  };
  
  return (
    <Container sx={{maxWidth: "100%"}}>
      <form onSubmit={handleSubmit}>
      <SearchBar>
        <CustomInputField
          type="search"
          value={search}
          onChange={handleChange}
        />
        <CustomButton type="search" />
      </SearchBar>   
    </form>
    </Container>
  );
};

export default Search;
