import React from 'react';
import { Button } from '@mui/material';

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
