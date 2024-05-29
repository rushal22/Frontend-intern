import "./App.css"
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import NavbarContainer from "./components/shared/layout/NavbarContainer"; 
import toast, { Toaster } from "react-hot-toast";
import Footer from "./components/shared/layout/Footer";
import DarkMode from "./components/shared/features/ThemeMode";
import {
  Login,
  NewPassword,
  ForgetPasswordForm,
  Registration,
  Home,
  ProductDetails,
  Profile,
  PageNotFound
} from "./components/pages";
import SearchPage from "./components/pages/Searched";
import Cart from "./components/pages/Cart";



function AppWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, handleToggleDarkMode] = DarkMode();
  const loggedIn = useSelector((state) => state.UserDetails.loggedIn);

  useEffect(() => {
    if (loggedIn && location.pathname === "/login") {
      navigate("/");
      toast.error("You are already logged in. Please logout first.");
    }
  }, [ location.pathname, navigate]);
  const hideNavbarRoutes =  ["/login" , "/signup", "*"]

  return (
    
      <div id="#root" className={darkMode ? "App dark-mode" : "App"}>
        <Toaster />
        {(!hideNavbarRoutes.includes(location.pathname)) && (
          <NavbarContainer onToggleDarkMode={handleToggleDarkMode} />
        )}
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgotpw" element={<ForgetPasswordForm />} />
            <Route
              path="/resetpassword/:token"
              exact
              element={<NewPassword />}
            />
            <Route path="/productdetail/:id" element={<ProductDetails />} />
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path = "*" element= {<PageNotFound />} />
            <Route path = "/cart" elemt = {<Cart/>} />
          </Routes>
        </div>
        <Footer />
      </div>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
};

export default App;
