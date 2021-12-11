import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import client from '../config/initClient.js';
import ShopContext from '../context/shopContext';
import collectionIds from '../config/collectionIds.js';
import { OutlinedGoHomeButton } from '../components/AppButton';
import {
  PageHead,
  ProductListName,
  ProductListDetails,
  Subhead,
} from '../components/AppText';
import LoadingSpinner from '../components/LoadingSpinner';
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
    window.scrollTo(0, 0);
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
    if (location.pathname.split('/')[1] === 'collections') {
      // for '/collections' accessed via buttons, incl state
      if (collId) {
        fetchCollection(collId);
      } else {
        // for manually entered '/collections' urls: valid, but n/incl state
        // try to match last path segment with a key in collectionIds
        // match ? get id & fetch : navigate to not-found
        const getCollId = (collName) => {
          for (const key in collectionIds) {
            if (key === collName) {
              return collectionIds[key];
            }
          }
        };
        const collName = location.pathname.split('/')[2];
        const foundCollId = getCollId(collName);
        if (foundCollId) {
          fetchCollection(foundCollId);
        } else {
          navigate('/not-found', {
            state: { message: 'not a valid collection name' },
          });
        }
      }
    } else if (location.pathname === '/products') {
      setItemsToShow({
        title: `All products`,
        products: products,
        headerColor: 'mediumGrayText',
      });
    } else {
      console.log(location.pathname);
      navigate('/not-found', { state: { message: 'failed request' } });
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

  const containerHeight = window.innerHeight - 65 * 2;

  if (!itemsToShow) {
    return <LoadingSpinner containerHeight={containerHeight} />;
  } else {
    const { title, headerColor } = itemsToShow;
    return (
      <Container>
        <PageHead color={headerColor}>{title}</PageHead>
        <Subhead color='gray'>
          {itemsToShow.products.length}
          {itemsToShow.products.length === 1 ? ` item` : ` items`}
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
            <OutlinedGoHomeButton />
          )}
        </Box>
      </Container>
    );
  }
}
