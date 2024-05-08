import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../reactredux/actions";
import Navbar from "./Navbar";
// import { loginUser } from "../../reactredux/actions";
const NavbarContainer = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.UserDetails.loggedIn);
  const firstName = useSelector((state) => state.UserDetails.firstName)
    console.log(loggedIn);


  const handleLogOut = () => {
    dispatch(logOutUser()); 
  };


  return (
    <Navbar
      loggedIn={loggedIn}
      onLogout={handleLogOut}
      firstName={firstName}
    />
  );
};

export default NavbarContainer;