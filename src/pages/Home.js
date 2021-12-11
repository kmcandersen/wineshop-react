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
import '../styles/App.css';

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
    p: customTheme.spacing(3),
  },
};

export default function Home() {
  const [collection, setCollection] = useState({});
  const [animate, setAnimate] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
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

  useEffect(() => {
    if (window.sessionStorage.getItem('firstLoadDone') === null) {
      setAnimate(true);
      // delay until after animations have run
      setTimeout(() => {
        window.sessionStorage.setItem('firstLoadDone', 1);
      }, 3000);
    } else {
      setAnimate(false);
    }
  }, []);

  document.title = 'Welcome to wineshop';

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={6} sx={styles.box}>
          <Typography component='h1' sx={styles.sloganText}>
            Find and buy your next favorite wine.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ ...styles.box, ...styles.redBox }}
          className={animate ? 'fade-in-1' : ''}
        >
          <OutlinedHeroLinkButton
            route='/collections/reds'
            collId={collectionIds.reds}
          >
            Shop all reds
          </OutlinedHeroLinkButton>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ ...styles.box, ...styles.whiteBox }}
          className={animate ? 'fade-in-2' : ''}
        >
          <OutlinedHeroLinkButton
            route='/collections/whites'
            collId={collectionIds.whites}
          >
            Shop all whites
          </OutlinedHeroLinkButton>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ ...styles.box, ...styles.roseBox }}
          className={animate ? 'fade-in-3' : ''}
        >
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
