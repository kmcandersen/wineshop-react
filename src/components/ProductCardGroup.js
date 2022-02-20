import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import customTheme from './../styles/theme.js';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from './ProductCard';
import { SectionHead } from './AppText';

const styles = {
  /* If component rendered on Home page, Box margins match ImageTextGroup */
  homeGroupWrapper: {
    mx: {
      xs: customTheme.spacing(5),
      sm: customTheme.spacing(2),
      md: customTheme.spacing(10),
    },
    my: '80px',
  },
  productGroupWrapper: {
    mt: { xs: '80px', sm: '100px' },
  },
};

export default function ProductCardGroup({ items, color, headerText }) {
  const stripeColor = color ? color : null;

  // used to detect if component is rendered on Home or Product page, to control margins
  // on product page, location.state will incl title
  const location = useLocation();

  if (items) {
    return (
      <Box
        sx={
          location.state === null
            ? styles.homeGroupWrapper
            : styles.productGroupWrapper
        }
      >
        <SectionHead headerText={headerText} />
        <Grid container columnSpacing={3} rowSpacing={2} direction='row'>
          {items.map((p) => (
            <Grid item key={p.id} xs={12} sm={6} md={4}>
              <ProductCard item={p} stripeColor={stripeColor} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  } else {
    return <LoadingSpinner containerHeight={220} />;
  }
}
