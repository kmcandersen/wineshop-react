import React from 'react';
import { Typography } from '@mui/material';
import customTheme from './../styles/theme.js';

export function PageHead({ children, color = 'mediumGray' }) {
  return (
    <Typography
      component='h1'
      style={{
        color: customTheme.palette[color].main,
        fontFamily: 'Playfair Display',
        fontSize: '2.3rem',
        fontWeight: 700,
      }}
    >
      {children}
    </Typography>
  );
}

export function SectionHead({ children }) {
  return (
    <Typography
      component='h2'
      style={{
        fontFamily: 'Playfair Display',
        fontSize: '2.3rem',
        letterSpacing: '0.25px',
      }}
    >
      {children}
    </Typography>
  );
}

export function Subhead1({ children }) {
  return (
    <Typography
      component='h2'
      style={{
        fontSize: '1.75rem',
        fontWeight: 700,
        color: customTheme.palette.black.main,
      }}
    >
      {children}
    </Typography>
  );
}

export function Subhead2({ children }) {
  return (
    <Typography
      component='h3'
      style={{
        fontSize: '1.25rem',
        color: customTheme.palette.mediumGray.main,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Typography>
  );
}

export function ProductCardName({ children }) {
  return (
    <Typography
      variant='body1'
      component='h3'
      style={{ fontSize: '1.25rem', fontWeight: 700 }}
    >
      {children}
    </Typography>
  );
}

export function ProductListName({ children }) {
  return (
    <Typography component='h4' style={{ fontSize: '1.4rem', fontWeight: 700 }}>
      {children}
    </Typography>
  );
}

export function ProductPageName({ children }) {
  return (
    <Typography
      component='h1'
      style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        color: customTheme.palette.black.main,
      }}
    >
      {children}
    </Typography>
  );
}

export function ProductDescDetails({ children }) {
  return (
    <Typography paragraph style={{ color: customTheme.palette.black.main }}>
      {children}
    </Typography>
  );
}

export function ProductDescBody({ children }) {
  return (
    <Typography
      paragraph
      style={{ color: customTheme.palette.black.main, fontStyle: 'italic' }}
    >
      {children}
    </Typography>
  );
}
