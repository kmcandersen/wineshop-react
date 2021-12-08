import React, { useContext } from 'react';
import ShopContext from '../context/shopContext';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export function TextButton({ children, color = 'primary' }) {
  return (
    <Button variant='text' color={color}>
      {children}
    </Button>
  );
}

export function FilledButton({ children, onClick, width }) {
  return (
    <Button
      variant='contained'
      color='secondary'
      sx={{
        mt: '10px',
        height: '45px',
        width: `${width === 'wide' ? '100%' : '200px'}`,
      }}
      onClick={onClick}
    >
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

export function OutlinedEmptyCartButton() {
  const { toggleCart } = useContext(ShopContext);
  return (
    <Link
      to={`/products`}
      onClick={() => toggleCart(false)}
      style={{ textDecoration: 'none' }}
    >
      <Button
        variant='outlined'
        color='secondary'
        sx={{ width: '250px', mt: '10px', height: '50px', borderWidth: '2px' }}
      >
        Start Shopping
      </Button>
    </Link>
  );
}

export function OutlinedHeroLinkButton({ children, route, collId }) {
  return (
    <Link to={route} state={{ collId }} style={{ textDecoration: 'none' }}>
      <Button
        variant='outlined'
        color='white'
        sx={{
          width: '250px',
          height: '50px',
          mt: '10px',
          borderWidth: '2px',
          backgroundColor: '#FFFFFF20',
          fontSize: '0.95rem',
          fontWeight: 700,
        }}
      >
        {children}
      </Button>
    </Link>
  );
}
