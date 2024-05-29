import React from "react";
import { InputBase, TextField } from "@mui/material";


const CustomInputField = ({ type, onChange, value }) => {
  const renderInputfield = () => {
    switch (type) {
      case "search":
        return (
            <InputBase
              name="search"
              id="search"
              value={value}
              inputProps={{ "aria-label": "search products" }}
              onChange={onChange}
              placeholder="Search..."
              sx={{ paddingLeft: "8px" , width: 300}}
            />
        );
        default:  
            return(
                <TextField 
                onChange={onChange}   
                />
            )
    }
  };
  return( 
    <div>
        {renderInputfield()}
    </div>
    
  ) 
};

export default CustomInputField;
