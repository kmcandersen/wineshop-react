import React from 'react';
import { Box } from '@mui/material';
import collectionIds from '../config/collectionIds.js';
import customTheme from './../styles/theme.js';
import drinkingPhoto from '../assets/woman-drinking-red-wine.jpeg';
import bottlesPhoto from '../assets/bottles-on-shelf.jpg';
import glassesPhoto from '../assets/wine-glasses.jpg';
import { ImageLinkButton } from '../components/AppButton';

const styles = {
  /* Outer Box margins match ProductCardGroup */
  groupWrapper: {
    mx: {
      xs: customTheme.spacing(5),
      sm: customTheme.spacing(2),
      md: customTheme.spacing(10),
    },
    my: { xs: customTheme.spacing(10) },
    gap: { xs: 2, md: 4 },
  },
  box: {
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: { xs: '200px', md: '250px' },
    // MUI custom system property usable with Box & sx: mui.com/system/properties
    gridColumn: { xs: 'span 12', sm: 'span 4' },
  },
  redBox: {
    backgroundImage: `linear-gradient(rgba(150, 12, 12, 0.75), rgba(150, 12, 12, 0.75)), url(${drinkingPhoto})`,
  },
  whiteBox: {
    backgroundImage: `linear-gradient(rgba(173, 134, 33, 0.8), rgba(173, 134, 33, 0.8)), url(${bottlesPhoto})`,
  },
  roseBox: {
    backgroundImage: `linear-gradient(rgba(181, 109, 109, 0.7), rgba(181, 109, 109, 0.7)), url(${glassesPhoto})`,
  },
};

export default function ImageTextGroup() {
  return (
    <Box
      display='grid'
      gridTemplateColumns='repeat(12, 1fr)'
      sx={styles.groupWrapper}
    >
      <Box
        sx={{
          ...styles.box,
          ...styles.redBox,
        }}
      >
        <ImageLinkButton route='/collections/reds' collId={collectionIds.reds}>
          Shop reds
        </ImageLinkButton>
      </Box>
      <Box
        sx={{
          ...styles.box,
          ...styles.whiteBox,
        }}
      >
        <ImageLinkButton
          route='/collections/whites'
          collId={collectionIds.whites}
        >
          Shop whites
        </ImageLinkButton>
      </Box>
      <Box
        sx={{
          ...styles.box,
          ...styles.roseBox,
        }}
      >
        <ImageLinkButton
          route='/collections/roses'
          collId={collectionIds.roses}
        >
          Shop rosés
        </ImageLinkButton>
      </Box>
    </Box>
  );
}
