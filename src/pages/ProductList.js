import React, { useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
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
  const { collections, products } = state;

  const location = useLocation();
  const collectionHandle = useParams();

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

  const getItemsToShow = () => {
    const subdirectory = location.pathname.split('/')[1];
    if (subdirectory === 'products') {
      return {
        title: `All products`,
        products: products,
        headerColor: 'mediumGrayText',
      };
    }
    if (subdirectory === 'collections' && collections.length) {
      const targetCollection = collections.find(
        (c) => c.handle === collectionHandle.handle
      );
      const headerColor = getHeaderColor(collectionHandle.handle);
      return {
        title: `All ${targetCollection.title}`,
        products: targetCollection.products,
        headerColor: headerColor,
      };
    }
  };

  const itemsToShow = collections && getItemsToShow();

  if (!itemsToShow) {
    return <div>Loading...</div>;
  } else {
    const { title, products, headerColor } = itemsToShow;
    return (
      <Container>
        <PageHead color={headerColor}>{title}</PageHead>
        <Subhead1>{products.length} items</Subhead1>
        <div style={{ ...styles.listContainer }}>
          {products.length ? (
            products.map((p) => (
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
                  <ProductListName handle={p.handle}>{p.title}</ProductListName>
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