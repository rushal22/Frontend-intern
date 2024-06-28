import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../../reactredux/actions";
import Navbar from "./Navbar";
// import { loginUser } from "../../reactredux/actions";
const NavbarContainer = ({onToggleDarkMode}) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.UserDetails.loggedIn);
  const firstName = useSelector((state) => state.UserDetails.firstName)
  let token = localStorage.getItem("Bearer")

  const handleLogOut = () => {
    dispatch(logOutUser()); 
  };


  return (
    <Navbar
      onToggleDarkMode = {onToggleDarkMode}
      loggedIn={loggedIn}
      onLogout={handleLogOut}
      firstName={firstName}
      token={token}  
    />
  );
};

export default NavbarContainer;