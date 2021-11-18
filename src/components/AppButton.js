import React from 'react';
import { Button } from '@mui/material';

export function TextButton({ children, color = 'primary' }) {
  return (
    <Button variant='text' color={color}>
      {children}
    </Button>
  );
}

export function OutlinedButton({ children }) {
  return (
    <Button variant='outlined' color='secondary'>
      {children}
    </Button>
  );
}
