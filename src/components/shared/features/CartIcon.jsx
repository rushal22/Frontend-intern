import React from 'react';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const CartIcon = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleClick = () => {
    navigate('/cart');
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        {/* Show the notification count if it's greater than 0 */}
        <Badge badgeContent={cartCount > 0 ? cartCount : null} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </div>
  );
};

export default CartIcon;
