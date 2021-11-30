import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import ShopContext from '../context/shopContext';
import { OutlinedLinkButton } from '../components/AppButton';

const styles = {
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default function CartEmpty() {
  const { toggleCart } = useContext(ShopContext);
  return (
    <Box sx={{ ...styles.messageContainer }}>
      <Typography paragraph>Your shopping cart is empty</Typography>
      <OutlinedLinkButton
        route={`/products`}
        clickHandler={() => toggleCart(false)}
      >
        Start Shopping
      </OutlinedLinkButton>
    </Box>
  );
}
