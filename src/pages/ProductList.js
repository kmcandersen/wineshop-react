import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import client from '../config/initClient.js';
import ShopContext from '../context/shopContext';
import {
  PageHead,
  ProductListName,
  ProductListDetails,
  Subhead,
} from '../components/AppText';
import customTheme from '../styles/theme.js';

const styles = {
  detailsRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: '4px',
  },
  listContainer: {
    marginTop: customTheme.spacing(7),
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingTop: customTheme.spacing(3),
    borderBottom: `1px solid ${customTheme.palette.lightGray.main}`,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: 700,
    marginBottom: 0,
  },
  image: {
    padding: '5px 17px 10px 0',
  },
};

export default function ProductList() {
  const { state } = useContext(ShopContext);
  const { products } = state;
  const [itemsToShow, setItemsToShow] = useState();

  const location = useLocation();
  const collId = location.state ? location.state.collId : null;
  const navigate = useNavigate();

  useEffect(() => {
    // if '/collections'
    if (collId) {
      const fetchCollection = async (collectionId) => {
        try {
          const collection = await client.collection.fetchWithProducts(
            collectionId
          );
          const headerColor = getHeaderColor(collection.handle);
          setItemsToShow({
            title:
              collection.title === 'Roses'
                ? 'All rosés'
                : `All ${collection.title}`,
            products: collection.products,
            headerColor: headerColor,
          });
        } catch (error) {
          console.log('error: ', error);
          navigate('/not-found', { state: { message: 'failed request' } });
        }
      };
      fetchCollection(collId);
    } else {
      // if '/products'
      setItemsToShow({
        title: `All products`,
        products: products,
        headerColor: 'mediumGrayText',
      });
    }
  }, [collId, location, navigate, products]);

  const getHeaderColor = (handle) => {
    if (handle === 'reds') {
      return 'maroon';
    }
    if (handle === 'whites') {
      return 'darkGold';
    }
    if (handle === 'roses') {
      return 'darkPink';
    }
  };

  document.title = itemsToShow && itemsToShow.title;

  if (!itemsToShow) {
    return <div>Loading...</div>;
  } else {
    const { title, headerColor } = itemsToShow;
    return (
      <Container>
        <PageHead color={headerColor}>{title}</PageHead>
        <Subhead color='gray'>
          {itemsToShow.products.length}
          {itemsToShow.products.length > 1 ? ` items` : ` item`}
        </Subhead>
        <Box sx={styles.listContainer}>
          {itemsToShow.products.length ? (
            itemsToShow.products.map((p) => (
              <Box key={p.id} sx={styles.listItem}>
                <img
                  src={p.images[0].src}
                  alt='bottle'
                  height={55}
                  style={{ ...styles.image }}
                />
                <Box style={styles.textContainer}>
                  <ProductListName handle={p.handle} title={p.title}>
                    {p.title}
                  </ProductListName>
                  <Box style={styles.detailsRow}>
                    <ProductListDetails>{p.productType}</ProductListDetails>
                    <Typography paragraph sx={styles.price}>
                      ${p.variants[0].price}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <h1>NO RESULTS</h1>
          )}
        </Box>
      </Container>
    );
  }
}
