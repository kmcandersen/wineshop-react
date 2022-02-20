import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { OutlinedHeroLinkButton } from '../components/AppButton';
import customTheme from './../styles/theme.js';
import grapesPhoto from '../assets/grapes-on-table.jpg';

export default function Hero() {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const styles = {
    heroWrapper: {
      backgroundImage: `linear-gradient(rgba(150, 12, 12, 0.75), rgba(150, 12, 12, 0.75)), url(${grapesPhoto})`,
      backgroundSize: 'cover',
      padding: smScreen ? '100px 0 60px 0' : '110px 0 90px 0',
    },
    textWrapper: {
      maxWidth: '540px',
      m: '0 auto',
      px: '20px',
      textAlign: 'center',
    },
    headlineText: {
      color: customTheme.palette.whiteText.main,
      fontFamily: 'Playfair Display',
      fontStyle: 'italic',
      fontSize: smScreen ? '2rem' : '3rem',
      lineHeight: 1.4,
      p: smScreen ? customTheme.spacing(1) : customTheme.spacing(3),
      textShadow: `2px 2px 3px rgba(0,0,0,0.5)`,
    },
    subheadText: {
      color: customTheme.palette.white.main,
      fontFamily: 'Lato',
      fontSize: smScreen ? '1.3rem' : '1.5rem',
      lineHeight: 1.4,
      pb: customTheme.spacing(1),
      textShadow: `2px 2px 2px rgba(0,0,0,0.3)`,
    },
  };

  return (
    <section style={styles.heroWrapper}>
      <Box sx={styles.textWrapper}>
        <Typography component='h1' sx={styles.headlineText}>
          Find and buy your next favorite wine.
        </Typography>
        {smScreen ? (
          <p style={styles.subheadText}>
            The world's best wines, hand selected by our Master Sommeliers.
          </p>
        ) : (
          <p style={styles.subheadText}>
            The world's best wines, hand selected
            <br /> by our Master Sommeliers.
          </p>
        )}

        <OutlinedHeroLinkButton route='products' state={null}>
          Shop all wines
        </OutlinedHeroLinkButton>
      </Box>
    </section>
  );
}
