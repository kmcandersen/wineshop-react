import React, { useContext, useState } from 'react';
import { Box, Container, Drawer, IconButton, Typography } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ErrorIcon from '@mui/icons-material/Error';
import ShopContext from '../context/shopContext';
import { FilledButton } from '../components/AppButton';
import { BodyTextSpecial, Subhead } from '../components/AppText';
import CartEmpty from '../components/CartEmpty';
import CartItem from '../components/CartItem';
import customTheme from '../styles/theme.js';

const styles = {
  buttonContainer: {
    width: '100%',
    height: '139px',
    mt: customTheme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
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
  const [showCheckoutMsg, setShowCheckoutMsg] = useState(false);

  const handleClose = () => {
    toggleCart(false);
    setShowCheckoutMsg(false);
  };

  const handleCheckout = () => {
    setShowCheckoutMsg(true);
    document.getElementById('checkoutMsgAnchor').scrollIntoView({
      alignToTop: false,
      behavior: 'smooth',
      block: 'start',
    });
  };

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
        <Container
          sx={{
            width: cartWidth,
            p: customTheme.spacing(3),
          }}
        >
          <Box sx={{ ...styles.flexRowSpaceBw }}>
            <Box sx={{ pl: '10px' }}>
              <Subhead size='lg'>Your Cart</Subhead>
            </Box>
            <IconButton
              sx={{ color: customTheme.palette.mediumGray }}
              onClick={handleClose}
              aria-label='close cart'
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
                <Box sx={{ p: customTheme.spacing(2) }}>
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
                    <Box sx={{ ...styles.buttonContainer }}>
                      <FilledButton onClick={handleCheckout}>
                        Checkout
                      </FilledButton>
                      <Box
                        sx={{
                          textAlign: 'right',
                        }}
                      >
                        {showCheckoutMsg && (
                          <BodyTextSpecial color='error'>
                            <ErrorIcon
                              fontSize='inherit'
                              sx={{
                                mr: '3px',
                                verticalAlign: 'text-bottom',
                              }}
                            />
                            This is a demo store, otherwise you would proceed to
                            Shopify's Checkout screen.
                          </BodyTextSpecial>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box id='checkoutMsgAnchor' />
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
