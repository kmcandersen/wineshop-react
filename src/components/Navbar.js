import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShopContext from './../context/shopContext';

export default function Navbar() {
  const { toggleCart } = useContext(ShopContext);
  return (
    <AppBar>
      <Toolbar>
        <div>
          <Link to='/'>WINESHOP</Link>
        </div>
        <div>
          <IconButton aria-label='cart' onClick={() => toggleCart(true)}>
            <ShoppingCartIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
