import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import client from '../config/initClient.js';
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
  const { addItemToCheckout } = useContext(ShopContext);
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState('1');

  const location = useLocation();
  const productTitle = location.state ? location.state.title : null;

  useEffect(() => {
    const fetchProductWithTitle = async (title) => {
      const productQuery = client.graphQLClient.query((root) => {
        root.addConnection(
          'products',
          {
            args: {
              first: 1,
              query: `title:${title}`,
            },
          },
          (product) => {
            product.add('id');
            product.add('availableForSale');
            product.add('description');
            product.add('handle');
            product.add('productType');
            product.add('tags');
            product.add('title');
            product.add('totalInventory');
            product.add('vendor');
            product.addConnection(
              'collections',
              { args: { first: 5 } },
              (order) => {
                order.add('handle');
              }
            );
            product.addConnection('images', { args: { first: 2 } }, (order) => {
              order.add('src');
            });
            product.addConnection(
              'variants',
              { args: { first: 1 } },
              (order) => {
                order.add('price');
              }
            );
          }
        );
      });

      const response = await client.graphQLClient.send(productQuery);
      setProduct(response.model.products[0]);
    };
    fetchProductWithTitle(productTitle);
  }, [location, productTitle]);

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = () => {
    addItemToCheckout(product.variants[0].id, quantity);
    setQuantity('1');
  };

  const getHeaderColor = (productCollArr) => {
    for (const coll of productCollArr) {
      if (coll.handle === 'reds') {
        return 'maroon';
      }
      if (coll.handle === 'whites') {
        return 'darkGold';
      }
      if (coll.handle === 'roses') {
        return 'darkPink';
      }
    }
  };

  const headerColor = product
    ? getHeaderColor(product.collections)
    : 'darkGrayText';

  console.log(headerColor);

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
                backgroundColor: customTheme.palette[headerColor].main,
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
