import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShopContext from './../context/shopContext';

export default function Navbar() {
  const { state, toggleCart } = useContext(ShopContext);
  const { isCartOpen } = state;
  return (
    <AppBar>
      <Toolbar>
        <div>
          <Link to='/'>WINESHOP</Link>
        </div>
        <div>
          <IconButton
            aria-label={!isCartOpen && 'Open Cart'}
            onClick={() => toggleCart(true)}
          >
            <ShoppingCartIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
