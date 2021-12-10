import React from 'react';
import { CircularProgress } from '@mui/material';
import customTheme from '../styles/theme.js';

export default function LoadingSpinner({ containerHeight }) {
  const styles = {
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <div style={{ height: containerHeight, ...styles.loadingContainer }}>
      <CircularProgress
        sx={{
          color: customTheme.palette.gold.main,
        }}
      />
    </div>
  );
}
