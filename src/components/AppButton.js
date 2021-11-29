import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ShopContext from '../context/shopContext';

export function TextButton({ children, color = 'primary' }) {
  return (
    <Button variant='text' color={color}>
      {children}
    </Button>
  );
}

export function OutlinedButton({ children, onClick }) {
  return (
    <Button
      variant='outlined'
      color='secondary'
      sx={{ width: '250px', mt: '10px', height: '50px', borderWidth: '2px' }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function OutlinedLinkButton({ children, color = 'secondary', route }) {
  const { toggleCart } = useContext(ShopContext);
  return (
    <Link
      to={route}
      onClick={() => toggleCart(false)}
      style={{ textDecoration: 'none' }}
    >
      <Button
        variant='outlined'
        color={color}
        sx={{ width: '250px', mt: '10px', height: '50px', borderWidth: '2px' }}
      >
        {children}
      </Button>
    </Link>
  );
}
