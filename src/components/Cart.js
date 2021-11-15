import React, { useContext } from 'react';
import { SwipeableDrawer, List, ListItem, ListItemText } from '@mui/material';
import ShopContext from './../context/shopContext';

export default function Cart() {
  const { state, toggleCart } = useContext(ShopContext);

  return (
    <SwipeableDrawer
      anchor='right'
      open={state.isCartOpen}
      onClose={() => toggleCart(false)}
      onOpen={() => toggleCart(true)}
    >
      <List>
        <ListItem>
          <ListItemText primary="I'm a cart" secondary='Here I am' />
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
}
