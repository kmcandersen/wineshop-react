import React, { useContext } from 'react';
import { Container, Typography } from '@mui/material';
import ShopContext from './../context/shopContext';
import {
  PageHead,
  ProductListName,
  ProductListDetails,
  Subhead1,
} from './../components/AppText';
import customTheme from './../styles/theme.js';

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

export default function Products() {
  const { state } = useContext(ShopContext);
  const { products } = state;

  if (!products) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container>
        <PageHead>all products</PageHead>
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
