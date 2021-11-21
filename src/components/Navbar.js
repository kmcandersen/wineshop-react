import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShopContext from './../context/shopContext';
import { ReactComponent as Logo } from '../assets/wineshop-logo.svg';
import customTheme from './../styles/theme.js';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  logo: {
    width: '100%',
    height: '40px',
  },
};

export default function Navbar() {
  const { state, toggleCart } = useContext(ShopContext);
  const { isCartOpen } = state;

  return (
    <AppBar
      position='fixed'
      sx={{ height: '9vh', backgroundColor: customTheme.palette.white.main }}
    >
      <Toolbar sx={{ ...styles.container }}>
        <div>
          <Link to='/'>
            <Logo style={{ ...styles.logo }} />
          </Link>
        </div>
        <div>
          <Link style={{ textDecoration: 'none' }} to='products'>
            <Button variant='text'>
              <Typography variant='button'>PRODUCTS</Typography>
            </Button>
          </Link>
          <Button
            variant='text'
            startIcon={
              <ShoppingCartIcon
                sx={{ color: customTheme.palette.mediumGrayText.main }}
              />
            }
            aria-label={!isCartOpen && 'Open Cart'}
            onClick={() => toggleCart(true)}
            sx={{ ml: '40px' }}
          >
            <Typography variant='button'>CART</Typography>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
