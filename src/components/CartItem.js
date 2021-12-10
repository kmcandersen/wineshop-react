import React, { useContext } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import ShopContext from '../context/shopContext';
import { CartListName } from '../components/AppText';
import customTheme from '../styles/theme.js';
import '../styles/App.css';

const styles = {
  buttonContainer: {
    my: customTheme.spacing(2),
    width: '250px',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  flexRowSpaceBw: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    padding: '5px 15px 10px 0',
  },
  lineItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: `1px solid ${customTheme.palette.lightGray.main}`,
    p: customTheme.spacing(2),
    pl: customTheme.spacing(3),
  },
  lineItemTotal: {
    fontWeight: 700,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
};

export default function CartItem({ item }) {
  const { state, updateCheckoutItem, removeLineItem } = useContext(ShopContext);

  // get inventory available from matching product in products, since this isn't stored with checkout line item
  const getItemInventory = () => {
    const matchingProduct = state.products.find(
      (p) => p.variants[0].id === item.variant.id
    );
    return matchingProduct.totalInventory;
  };

  const itemInventory = getItemInventory();

  if (itemInventory) {
    return (
      <Box sx={styles.lineItemContainer}>
        <img
          src={item.variant.image.src}
          alt='bottle'
          height={60}
          style={{ ...styles.image }}
        />
        <Box sx={styles.textContainer}>
          <CartListName handle={item.variant.product.handle} title={item.title}>
            {item.title}
          </CartListName>
          <Box sx={styles.flexRowSpaceBw}>
            <Typography paragraph>
              ${item.variant.price * 1} ea x {item.quantity}
            </Typography>
            <Typography paragraph sx={{ ...styles.lineItemTotal, pr: '8px' }}>
              ${item.quantity * item.variant.price}.00
            </Typography>
          </Box>

          <Box sx={styles.flexRowSpaceBw}>
            <Box sx={styles.buttonContainer}>
              <FormControl fullWidth>
                <InputLabel>Quantity</InputLabel>
                <Select
                  value={item.quantity}
                  name='quantity'
                  label='Quantity'
                  onChange={(e) => updateCheckoutItem(item.id, e.target.value)}
                  sx={{ height: '45px', width: '80px' }}
                >
                  {[...Array(itemInventory).keys()].map((n) => (
                    <MenuItem key={n + 1} value={n + 1}>
                      {n + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Button
              variant='text'
              sx={{ color: customTheme.palette.mediumGray }}
              onClick={() => removeLineItem(item.id, item.variant.id)}
            >
              REMOVE
            </Button>
          </Box>

          {item.quantity === itemInventory && (
            <Typography
              paragraph
              sx={{
                color: customTheme.palette.error.main,
                fontStyle: 'italic',
                mt: customTheme.spacing(1),
                mb: customTheme.spacing(2),
              }}
            >
              Maximum quantity reached
            </Typography>
          )}
        </Box>
      </Box>
    );
  } else {
    return null;
  }
}
