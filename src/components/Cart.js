import React, { useContext } from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import ShopContext from './../context/shopContext';

export default function Cart() {
  const { state, toggleCart } = useContext(ShopContext);
  const { isCartOpen } = state;
  return (
    <Drawer anchor='right' open={isCartOpen} onClose={() => toggleCart(false)}>
      <List>
        <ListItem>
          <ListItemText primary="I'm a cart" secondary='Here I am' />
        </ListItem>
      </List>
    </Drawer>
  );
}
