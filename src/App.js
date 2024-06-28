import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
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
import "./assets/css/main.css"
import EditProduct from "./admin/adminPages/EditProduct";
import CreateProduct from "./admin/adminPages/CreateProduct";
import ViewProduct from "./admin/adminPages/ViewProduct";
import AdminLayout from "./admin/adminComponents/AdminLayout";
import MainLayout from "./components/shared/layout/MainLayout";
import AdminHomePage from "./admin/adminPages/AdminHomePage";
import OrderAdmin from "./admin/adminPages/OrderAdmin";
import SettingsAdmin from "./admin/adminPages/SettingsAdmin";
import AdminProfile from "./admin/adminPages/AdminProfile";
import CategoryList from "./components/pages/CategoryList";
import Order from "./components/pages/Order";
import TrackOrder from "./components/pages/TrackOrder";


function AppWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn = useSelector((state) => state.UserDetails.loggedIn);
  useEffect(() => {
    if (loggedIn && location.pathname === "/login") {
      navigate("/");
      toast.error("You are already logged in. Please logout first.");
    }
  }, [ location.pathname, navigate]);
  return (
    
      <div >
        <Toaster />
        <Routes>
        <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Registration />} />
        <Route path="profile" element={<Profile />} />
        <Route path="forgotpw" element={<ForgetPasswordForm />} />
        <Route path="resetpassword/:token" element={<NewPassword />} />
        <Route path="productdetail/:id" element={<ProductDetails />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="category/:id" element= {<CategoryList />} />
        {loggedIn && <Route path="cart" element={<Cart />} />}
        <Route path="order" element= {<Order />} />
        <Route path="trackorder" element = {<TrackOrder />} />
      </Route>

      <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="home" element={<AdminHomePage />} />
        <Route path="create" element={<CreateProduct />} />
        <Route path=":id" element={<EditProduct />} />
        <Route path="view" element={<ViewProduct />} />
        <Route path="orders" element={<OrderAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
        <Route path="profile" element= {<AdminProfile />} />
      </Route>
    </Routes>
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
