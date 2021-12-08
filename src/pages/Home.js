import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import client from '../config/initClient.js';
import collectionIds from '../config/collectionIds.js';
import customTheme from './../styles/theme.js';
import { OutlinedHeroLinkButton } from '../components/AppButton';
import ProductCardGroup from '../components/ProductCardGroup';
import grapesPhoto from '../assets/grapes-on-table.jpg';
import bottlesPhoto from '../assets/bottles-on-shelf.jpg';
import glassesPhoto from '../assets/wine-glasses.jpg';

const styles = {
  box: {
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '250px',
  },
  redBox: {
    backgroundImage: `linear-gradient(rgba(150, 12, 12, 0.75), rgba(150, 12, 12, 0.75)), url(${grapesPhoto})`,
  },
  whiteBox: {
    backgroundImage: `linear-gradient(rgba(173, 134, 33, 0.8), rgba(173, 134, 33, 0.8)), url(${bottlesPhoto})`,
  },
  roseBox: {
    backgroundImage: `linear-gradient(rgba(181, 109, 109, 0.7), rgba(181, 109, 109, 0.7)), url(${glassesPhoto})`,
  },
  sloganText: {
    color: customTheme.palette.darkGrayText,
    fontFamily: 'Playfair Display',
    textAlign: 'center',
    fontSize: '2rem',
    p: '10px',
  },
};

export default function Home() {
  const [collection, setCollection] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollection = async (collectionId) => {
      try {
        const collection = await client.collection.fetchWithProducts(
          collectionId
        );
        setCollection(collection);
      } catch (error) {
        console.log('error: ', error);
        navigate('/not-found', { state: { message: 'failed request' } });
      }
    };
    fetchCollection(collectionIds.featured);
  }, [navigate]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={6} sx={{ ...styles.box }}>
          <Typography component='h1' sx={{ ...styles.sloganText }}>
            Find and buy your next favorite wine.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ ...styles.box, ...styles.redBox }}>
          <OutlinedHeroLinkButton
            route='/collections/reds'
            collId={collectionIds.reds}
          >
            Shop all reds
          </OutlinedHeroLinkButton>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ ...styles.box, ...styles.whiteBox }}>
          <OutlinedHeroLinkButton
            route='/collections/whites'
            collId={collectionIds.whites}
          >
            Shop all whites
          </OutlinedHeroLinkButton>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ ...styles.box, ...styles.roseBox }}>
          <OutlinedHeroLinkButton
            route='/collections/roses'
            collId={collectionIds.roses}
          >
            Shop all rosés
          </OutlinedHeroLinkButton>
        </Grid>
      </Grid>

      <ProductCardGroup
        items={collection.products}
        headerText='Favorite Summer Sips'
      />
    </Container>
  );
}
