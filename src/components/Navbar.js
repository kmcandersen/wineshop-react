import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar>
      <Toolbar>
        <div>
          <Link to='/'>WINESHOP</Link>
        </div>
        <div>
          <div>CART</div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
