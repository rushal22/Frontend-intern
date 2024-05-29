import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  return (
    <CartContext.Provider value={{ notificationCount, setNotificationCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
