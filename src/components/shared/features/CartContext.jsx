import React, { createContext, useContext, useState, useEffect } from "react";
import baseApi from "../../../apibase-endpoint/apiBase";
import { cartEnd } from "../../../apibase-endpoint/apiEndpoint";
import { useSelector } from "react-redux";

// Create context
const CartContext = createContext();

// Custom hook to use CartContext
export const useCart = () => useContext(CartContext);

// CartContext provider component
export const CartProvider = ({ children }) => {
  const loggedIn = useSelector((state) => state.UserDetails.loggedIn);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await baseApi({ apiDetails: cartEnd.itemCount });
        if (response.status === 200) {
          setCartCount(response.data.item_count);
        }
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    if (loggedIn) {
      fetchCartCount();
    }
  }, [loggedIn]);

  const updateCartCount = async () => {
    try {
      const response = await baseApi({ apiDetails: cartEnd.itemCount });
      if (response.status === 200) {
        setCartCount(response.data.item_count);
      }
    } catch (error) {
      console.error("Error updating cart count:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
