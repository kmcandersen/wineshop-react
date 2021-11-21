import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import customTheme from './../styles/theme.js';

export function PageHead({ children, color = 'mediumGrayText' }) {
  return (
    <Typography
      component='h1'
      style={{
        color: customTheme.palette[color].main,
        fontFamily: 'Playfair Display',
        fontSize: '2.2rem',
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
        fontSize: '2.2rem',
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
        fontSize: '1.65rem',
        fontWeight: 700,
        color: customTheme.palette.black.main,
        paddingTop: '5px',
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
        color: customTheme.palette.mediumGrayText.main,
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

export function ProductListName({ children, handle }) {
  return (
    <Link to={`/products/${handle}`} style={{ textDecoration: 'none' }}>
      <Typography
        component='h4'
        style={{
          color: customTheme.palette.black.main,
          fontSize: '1.3rem',
          fontWeight: 700,
        }}
      >
        {children}
      </Typography>
    </Link>
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
    <div style={{ flex: 1 }}>
      <Typography
        paragraph
        style={{
          color: customTheme.palette.darkGrayText.main,
          marginBottom: 0,
        }}
      >
        {children}
      </Typography>
    </div>
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
