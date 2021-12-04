import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import client from '../config/initClient.js';
import collectionIds from '../config/collectionIds.js';
import { OutlinedHeroLinkButton } from '../components/AppButton';

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
      <OutlinedHeroLinkButton
        route='/collections/reds'
        collId={collectionIds.reds}
      >
        Shop all reds
      </OutlinedHeroLinkButton>
      <OutlinedHeroLinkButton
        color='darkGold'
        route='/collections/whites'
        collId={collectionIds.whites}
      >
        Shop all whites
      </OutlinedHeroLinkButton>
      <OutlinedHeroLinkButton
        color='darkPink'
        route='/collections/roses'
        collId={collectionIds.roses}
      >
        Shop all rosés
      </OutlinedHeroLinkButton>
    </Container>
  );
}
