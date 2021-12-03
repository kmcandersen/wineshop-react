import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Chip, Container, Typography } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import client from '../config/initClient.js';
import ShopContext from './../context/shopContext';
import {
  BodyTextSpecial,
  ProductDescDetails,
  ProductPageName,
} from './../components/AppText';
import { FilledButton } from './../components/AppButton';
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

  const location = useLocation();
  const productTitle = location.state ? location.state.title : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductWithTitle = async (title) => {
      try {
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
              product.addConnection(
                'images',
                { args: { first: 2 } },
                (order) => {
                  order.add('src');
                }
              );
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
        if (response.errors) {
          throw new Error('failed to fetch product');
        }
        setProduct(response.model.products[0]);
      } catch (error) {
        console.log('error: ', error);
        navigate('/not-found', { state: { message: 'failed request' } });
      }
    };
    fetchProductWithTitle(productTitle);
  }, [location, navigate, productTitle]);

  const handleSubmit = () => {
    addItemToCheckout(product.variants[0].id, 1, product.totalInventory);
  };

  const getTagData = (tagsArr) => {
    let result = {
      color: '',
      headerColor: '',
      country: '',
      countrycode: '',
      rating: '',
      ratingText: '',
      region: '',
      flavors: [],
    };
    for (const tag of tagsArr) {
      if (tag.value.includes('flavor')) {
        result.flavors.push(tag.value.split('-')[1]);
      } else {
        const tagKey = tag.value.split('-')[0];
        const tagValue = tag.value.split('-')[1];
        result[tagKey] = tagValue;
      }
    }
    result.headerColor = getHeaderColor(result.color);
    result.ratingText = getScoreText(result.rating);
    return result;
  };

  const getHeaderColor = (colorCategory) => {
    switch (colorCategory) {
      case 'red':
        return 'maroon';
      case 'white':
        return 'gold';
      case 'rosé':
        return 'pink';
      default:
        return 'lightGray';
    }
  };

  const getScoreText = (rating) => {
    if (rating >= 98) {
      return 'Classic';
    } else if (rating >= 94) {
      return 'Superb';
    } else if (rating >= 90) {
      return 'Excellent';
    } else if (rating >= 87) {
      return 'Very Good';
    } else if (rating >= 83) {
      return 'Good';
    } else if (rating >= 80) {
      return 'Acceptable';
    } else {
      return '';
    }
  };

  const tagData = product && getTagData(product.tags);

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
                backgroundColor: customTheme.palette[tagData.headerColor].main,
              }}
            />

            <ProductPageName>{product.title}</ProductPageName>
            <div style={{ flex: 1 }}>
              <Typography
                paragraph
                sx={{
                  color: customTheme.palette.black.main,
                  mb: '10px',
                  letterSpacing: '0.25px',
                }}
              >
                ORIGIN:{' '}
                <span style={{ textTransform: 'capitalize' }}>
                  {tagData.region}, {tagData.country}
                </span>
                <ReactCountryFlag
                  style={{
                    margin: '0 0 5px 6px',
                  }}
                  countryCode={tagData.countrycode}
                  svg
                />
              </Typography>
            </div>

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
            <ProductDescDetails>
              SCORE: <span style={{ fontWeight: 700 }}>{tagData.rating}</span>
              <span
                style={{
                  color: customTheme.palette.mediumGrayText.main,
                }}
              >
                &nbsp;&nbsp;{`${tagData.ratingText}`}
              </span>
            </ProductDescDetails>
            <BodyTextSpecial>{product.description}</BodyTextSpecial>
            <Box>
              {tagData.flavors.map((f, index) => (
                <Chip
                  key={index}
                  label={f}
                  variant='outlined'
                  size='small'
                  sx={{
                    mx: '4px',
                    borderRadius: '3px',
                    textTransform: 'capitalize',
                  }}
                />
              ))}
            </Box>
            <Box sx={{ ...styles.buttonContainer }}>
              {!product.availableForSale ? (
                <BodyTextSpecial color='mediumGrayText'>
                  This item is currently sold out.
                </BodyTextSpecial>
              ) : (
                <FilledButton onClick={handleSubmit}>Add to Cart</FilledButton>
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
