import React, { useContext } from 'react';
import { Box, Container, Drawer, IconButton, Typography } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ShopContext from '../context/shopContext';
import { OutlinedButton } from '../components/AppButton';
import { BodyTextSpecial, Subhead } from '../components/AppText';
import CartEmpty from '../components/CartEmpty';
import CartItem from '../components/CartItem';
import customTheme from '../styles/theme.js';

const styles = {
  flexRowSpaceBw: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartSubtotal: {
    fontSize: '1.1rem',
    fontWeight: 700,
    marginBottom: 0,
  },
  flexColumnRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  listContainer: {
    marginTop: '35px',
  },
  lineItemRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export default function Cart() {
  const { state, toggleCart } = useContext(ShopContext);
  const { checkout, isCartOpen } = state;

  const windowWidth = window.innerWidth;
  const cartWidth =
    windowWidth > 1200
      ? windowWidth / 3
      : windowWidth > 600
      ? windowWidth / 2
      : windowWidth;

  if (checkout.lineItems) {
    return (
      <Drawer
        anchor='right'
        open={isCartOpen}
        onClose={() => toggleCart(false)}
      >
        <Container sx={{ width: cartWidth }}>
          <Box sx={{ ...styles.flexRowSpaceBw }}>
            <Subhead size='lg'>Your Cart</Subhead>
            <IconButton
              sx={{ color: customTheme.palette.mediumGray }}
              onClick={() => toggleCart(false)}
            >
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Box sx={{ ...styles.listContainer }}>
            {checkout.lineItems.length ? (
              <Box>
                {checkout.lineItems.map((p) => (
                  <CartItem key={p.id} item={p} />
                ))}
                <Box sx={{ ...styles.flexRowSpaceBw }}>
                  <Subhead color='gray'>Subtotal</Subhead>
                  <Typography paragraph style={{ ...styles.cartSubtotal }}>
                    ${checkout.totalPrice}
                  </Typography>
                </Box>
                <Box sx={{ ...styles.flexColumnRight }}>
                  <BodyTextSpecial>
                    Tax and shipping will be calculated during checkout
                  </BodyTextSpecial>
                  <OutlinedButton onClick={() => toggleCart(false)}>
                    Checkout
                  </OutlinedButton>
                </Box>
              </Box>
            ) : (
              <CartEmpty />
            )}
          </Box>
        </Container>
      </Drawer>
    );
  } else {
    return null;
  }
}
