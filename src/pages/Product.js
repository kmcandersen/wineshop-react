import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Chip, Container, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactCountryFlag from 'react-country-flag';
import client from '../config/initClient.js';
import { getTagData } from '../utils/helperFunctions.js';
import ShopContext from './../context/shopContext';
import {
  BodyTextSpecial,
  ProductDescDetails,
  ProductPageName,
} from './../components/AppText';
import { FilledButton } from './../components/AppButton';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCardGroup from '../components/ProductCardGroup';
import collectionIds from '../config/collectionIds.js';
import customTheme from './../styles/theme.js';

const styles = {
  accentStripe: {
    width: '100px',
    height: customTheme.spacing(2),
  },
  buttonContainer: {
    mt: customTheme.spacing(6),
    width: '100%',
  },
  imageContainerXS: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    mt: customTheme.spacing(6),
  },
  textContent: {
    mx: customTheme.spacing(5),
  },
};

export default function Product() {
  const { addItemToCheckout } = useContext(ShopContext);
  const [product, setProduct] = useState();
  const [tagData, setTagData] = useState();
  const [relatedProducts, setRelatedProducts] = useState();
  const location = useLocation();
  const productTitle = location.state ? location.state.title : null;
  const navigate = useNavigate();

  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const xsScreen = useMediaQuery('(max-width:444px)');

  useEffect(() => {
    window.scrollTo(0, 0);
    // fetch current product & set state; parse current product.tags & set state; fetch items in product's matching color collection; remove current product from collection.products--remainder are the related items--& set state
    const fetchProductInfo = async (title) => {
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
        const currentProduct = response.model.products[0];
        setProduct(currentProduct);
        const tagsObj = getTagData(currentProduct.tags);
        setTagData(tagsObj);
        const collName = `${tagsObj.color}s`;
        const collectionId = collectionIds[collName];
        const colorCollection = await client.collection.fetchWithProducts(
          collectionId
        );
        const filteredResult = colorCollection.products.filter(
          (item) => item.id !== currentProduct.id
        );
        setRelatedProducts(filteredResult);
      } catch (error) {
        console.log('error: ', error);
        navigate('/not-found', { state: { message: 'failed request' } });
      }
    };
    fetchProductInfo(productTitle);
  }, [location, navigate, productTitle]);

  const handleSubmit = () => {
    addItemToCheckout(product.variants[0].id, 1);
  };

  document.title = product && product.title;

  const containerHeight = window.innerHeight - 65 * 2;

  if (product && tagData) {
    return (
      <Container>
        <Box sx={{ display: 'flex' }}>
          {!xsScreen && (
            <Box sx={{ mr: customTheme.spacing(3) }}>
              {product.images && (
                <img
                  src={product.images[0].src}
                  height={320}
                  alt='bottle'
                  style={{ margin: '10px 0' }}
                />
              )}
              {smScreen && product.images && (
                <img
                  src={product.images[1].src}
                  width={'95%'}
                  alt='bottle label'
                  style={{ margin: '10px 0' }}
                />
              )}
            </Box>
          )}

          <Box sx={styles.textContent}>
            <div
              style={{
                ...styles.accentStripe,
                backgroundColor: customTheme.palette[tagData.stripeColor].main,
              }}
            />

            <ProductPageName>{product.title}</ProductPageName>
            <Box sx={{ flex: 1 }}>
              <Typography
                paragraph
                sx={{
                  color: customTheme.palette.black.main,
                  mb: customTheme.spacing(2),
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
            </Box>

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
                    m: '4px',
                    borderRadius: '3px',
                    textTransform: 'capitalize',
                  }}
                />
              ))}
            </Box>
            {xsScreen && (
              <Box sx={styles.imageContainerXS}>
                {product.images && (
                  <img src={product.images[0].src} height={320} alt='bottle' />
                )}
                <img
                  src={product.images[1].src}
                  width={110}
                  alt='bottle label'
                  style={{ marginLeft: customTheme.spacing(6) }}
                />
              </Box>
            )}

            <Box sx={styles.buttonContainer}>
              {!product.availableForSale ? (
                <BodyTextSpecial color='error'>
                  This item is currently sold out.
                </BodyTextSpecial>
              ) : (
                <FilledButton
                  onClick={handleSubmit}
                  width={xsScreen ? 'wide' : 'regular'}
                >
                  Add to Cart
                </FilledButton>
              )}
            </Box>
          </Box>
          <Box>
            {!smScreen && product.images && (
              <img
                src={product.images[1].src}
                height={150}
                alt='bottle label'
                style={{ margin: '10px 0' }}
              />
            )}
          </Box>
        </Box>
        <Box>
          {relatedProducts && (
            <ProductCardGroup
              color={tagData.stripeColor}
              items={relatedProducts}
              headerText='May we recommend...'
            />
          )}
        </Box>
      </Container>
    );
  } else {
    return <LoadingSpinner containerHeight={containerHeight} />;
  }
}
