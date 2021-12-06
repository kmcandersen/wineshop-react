import React from 'react';
import { Grid } from '@mui/material';

import ProductCard from './ProductCard';

export default function ProductCardGroup({ items, color }) {
  const stripeColor = color ? color : null;

  if (items) {
    return (
      <Grid container spacing={2}>
        <Grid item sm={6} md={3}>
          {items.map((p) => (
            <ProductCard key={p.id} item={p} stripeColor={stripeColor} />
          ))}
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
}
