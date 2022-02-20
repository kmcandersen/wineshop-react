import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import '../styles/App.css';
import client from '../config/initClient.js';
import collectionIds from '../config/collectionIds.js';
import customTheme from './../styles/theme.js';
import grapesPhoto from '../assets/grapes-on-table.jpg';
import bottlesPhoto from '../assets/bottles-on-shelf.jpg';
import glassesPhoto from '../assets/wine-glasses.jpg';
import { OutlinedHeroLinkButton } from '../components/AppButton';

import ProductCardGroup from '../components/ProductCardGroup';

const styles = {
  box: {
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  const navigate = useNavigate();

  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

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

  document.title = 'Welcome to wineshop';

  return (
    <>
      <ProductCardGroup
        items={collection.products}
        headerText='Favorite Summer Sips'
      />
    </>
  );
}
