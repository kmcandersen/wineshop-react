import React from 'react';
import { Box, Grid } from '@mui/material';

import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from './ProductCard';
import { SectionHead } from './AppText';

export default function ProductCardGroup({ items, color, headerText }) {
  const stripeColor = color ? color : null;

  if (items) {
    return (
      <Box sx={{ flexGrow: 1, mt: '80px' }}>
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
