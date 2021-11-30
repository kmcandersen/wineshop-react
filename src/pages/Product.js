import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import ShopContext from './../context/shopContext';
import {
  BodyTextSpecial,
  ProductDescDetails,
  ProductPageName,
} from './../components/AppText';
import { OutlinedButton } from './../components/AppButton';
import customTheme from './../styles/theme.js';

const styles = {
  accentRule: {
    width: '100px',
    height: '10px',
  },
  bottleImage: {
    marginRight: '20px',
  },
  buttonContainer: {
    my: '30px',
    width: '250px',
  },
  labelImage: {
    marginTop: '10px',
  },
  textContent: {
    mx: '25px',
  },
};

export default function Product() {
  const [quantity, setQuantity] = useState('1');
  const { handle } = useParams();

  const { addItemToCheckout, state } = useContext(ShopContext);

  const { products } = state;
  const product = products.find((p) => p.handle === handle);

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = () => {
    addItemToCheckout(product.variants[0].id, quantity);
    setQuantity('1');
  };

  if (!product) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container>
        <Box sx={{ display: 'flex' }}>
          {product.images && (
            <img src={product.images[0].src} height={320} alt='bottle' />
          )}
          <Box sx={{ ...styles.textContent }}>
            <div
              style={{
                ...styles.accentRule,
                backgroundColor: customTheme.palette.mediumGray.main,
              }}
            />

            <ProductPageName>{product.title}</ProductPageName>
            <ProductDescDetails>WINERY: {product.vendor}</ProductDescDetails>
            <ProductDescDetails>
              VARIETAL: {product.productType}
            </ProductDescDetails>
            <ProductDescDetails>
              PRICE:{' '}
              <span style={{ fontWeight: 700 }}>
                ${product.variants && product.variants[0].price}
              </span>
            </ProductDescDetails>
            <BodyTextSpecial>{product.description}</BodyTextSpecial>
            <Box sx={{ ...styles.buttonContainer }}>
              <FormControl fullWidth>
                <InputLabel>Quantity</InputLabel>

                <Select
                  value={quantity}
                  name='quantity'
                  label='Quantity'
                  onChange={handleChange}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
              {product.variants && (
                <OutlinedButton onClick={handleSubmit}>
                  Add to Cart
                </OutlinedButton>
              )}
            </Box>
          </Box>
          <Box>
            {product.images && (
              <img
                src={product.images[1].src}
                height={150}
                alt='bottle label'
                style={{ ...styles.labelImage }}
              />
            )}
          </Box>
        </Box>
      </Container>
    );
  }
}
