import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import customTheme from './../styles/theme.js';
import ShopContext from './../context/shopContext';
import { getStripeColor } from '../utils/helperFunctions.js';
import { ProductCardName, ProductDescDetails } from './AppText';

export default function ProductCard(props) {
  const { state } = useContext(ShopContext);
  const { item } = props;

  let stripeColor = props.stripeColor;

  const getColorTag = (tagsArr) => {
    for (const tag of tagsArr) {
      if (tag.value.includes('color')) {
        return tag.value.split('-')[1];
      }
    }
  };

  if (!stripeColor && state.products) {
    const matchingProduct = state.products.find((p) => p.id === item.id);
    const colorTag = matchingProduct && getColorTag(matchingProduct.tags);
    stripeColor = getStripeColor(colorTag);
  }

  return (
    <Link
      to={`/products/${item.handle}`}
      state={{ title: item.title }}
      style={{ textDecoration: 'none' }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', p: customTheme.spacing(2) }}>
          <img
            src={item.images[0].src}
            height={75}
            alt='bottle'
            style={{ paddingRight: customTheme.spacing(3) }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                backgroundColor: customTheme.palette[stripeColor].main,
                height: '6px',
                width: '37px',
              }}
            ></div>
            <ProductCardName>{item.title}</ProductCardName>
            <ProductDescDetails>
              <span>${item.variants[0].price}</span>
            </ProductDescDetails>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
