import React, { useContext } from 'react';
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ShopContext from '../context/shopContext';
import { CartListName } from '../components/AppText';
import customTheme from '../styles/theme.js';

const styles = {
  buttonContainer: {
    my: '30px',
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
  const { updateCheckoutItem, removeLineItem } = useContext(ShopContext);

  return (
    <Box
      sx={{
        ...styles.lineItemContainer,
      }}
    >
      <img
        src={item.variant.image.src}
        alt='bottle'
        height={60}
        style={{ ...styles.image }}
      />
      <Box sx={{ ...styles.textContainer }}>
        <CartListName handle={item.variant.product.handle}>
          {item.title}
        </CartListName>
        <Box sx={{ ...styles.flexRowSpaceBw }}>
          <Typography paragraph>
            ${item.variant.price * 1} ea x {item.quantity}
          </Typography>
          <Typography paragraph sx={{ ...styles.lineItemTotal }}>
            ${item.quantity * item.variant.price}.00
          </Typography>
        </Box>

        <Box sx={{ ...styles.flexRowSpaceBw }}>
          <Box sx={{ ...styles.buttonContainer }}>
            <FormControl fullWidth>
              <InputLabel>Quantity</InputLabel>
              <Select
                value={item.quantity}
                name='quantity'
                label='Quantity'
                onChange={(e) => updateCheckoutItem(item.id, e.target.value)}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <IconButton
            sx={{ color: customTheme.palette.mediumGray }}
            onClick={() => removeLineItem(item.id)}
          >
            <CancelOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
