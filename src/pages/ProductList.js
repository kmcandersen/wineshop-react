import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import client from '../config/initClient.js';
import ShopContext from '../context/shopContext';
import {
  PageHead,
  ProductListName,
  ProductListDetails,
  Subhead1,
} from '../components/AppText';
import customTheme from '../styles/theme.js';

const styles = {
  detailsRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: '7px',
  },
  listContainer: {
    marginTop: '35px',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingTop: '15px',
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
    padding: '5px 15px 10px 0',
  },
};

export default function ProductList() {
  const { state } = useContext(ShopContext);
  const { products } = state;
  const [itemsToShow, setItemsToShow] = useState();

  const location = useLocation();
  const collId = location.state ? location.state.collId : null;

  useEffect(() => {
    // if '/collections'
    if (collId) {
      const fetchCollection = async (collectionId) => {
        const collection = await client.collection.fetchWithProducts(
          collectionId
        );
        const headerColor = getHeaderColor(collection.handle);
        setItemsToShow({
          title: `All ${collection.title}`,
          products: collection.products,
          headerColor: headerColor,
        });
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
  }, [collId, location, products]);

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

  if (!itemsToShow) {
    return <div>Loading...</div>;
  } else {
    const { title, headerColor } = itemsToShow;
    return (
      <Container>
        <PageHead color={headerColor}>{title}</PageHead>
        <Subhead1>{itemsToShow.products.length} items</Subhead1>
        <div style={{ ...styles.listContainer }}>
          {itemsToShow.products.length ? (
            itemsToShow.products.map((p) => (
              <div
                key={p.id}
                style={{
                  ...styles.listItem,
                }}
              >
                <img
                  src={p.images[0].src}
                  alt='bottle'
                  height={60}
                  style={{ ...styles.image }}
                />
                <div style={{ ...styles.textContainer }}>
                  <ProductListName handle={p.handle} title={p.title}>
                    {p.title}
                  </ProductListName>
                  <div style={{ ...styles.detailsRow }}>
                    <ProductListDetails>{p.productType}</ProductListDetails>
                    <Typography paragraph style={{ ...styles.price }}>
                      ${p.variants[0].price}
                    </Typography>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>NO RESULTS</h1>
          )}
        </div>
      </Container>
    );
  }
}
