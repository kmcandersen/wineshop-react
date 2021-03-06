import React from 'react';
import { Box, Typography } from '@mui/material';
import { OutlinedEmptyCartButton } from '../components/AppButton';

const styles = {
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default function CartEmpty() {
  return (
    <Box sx={{ ...styles.messageContainer }}>
      <Typography paragraph>Your shopping cart is empty</Typography>
      <OutlinedEmptyCartButton />
    </Box>
  );
}
