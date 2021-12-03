import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import client from '../config/initClient.js';
import { OutlinedHeroLinkButton } from '../components/AppButton';

const redsId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIxMjgzOTEwNDY3NQ==';
const whitesId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIxMjgzOTIwMjk3OQ==';
const rosesId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIxMjgzOTE3MDIxMQ==';
// summer-sips
const featuredId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIxMzE5MTUyNDUxNQ==';

export default function Home() {
  const [collection, setCollection] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollection = async (collectionId) => {
      try {
        const collection = await client.collection.fetchWithProducts(
          collectionId
        );
        if (collection.errors) {
          throw new Error('failed to fetch collection');
        }
        setCollection(collection);
      } catch (error) {
        console.log('error: ', error);
        navigate('/not-found', { state: { message: 'failed request' } });
      }
    };
    fetchCollection(featuredId);
  }, [navigate]);

  return (
    <Container>
      <OutlinedHeroLinkButton route='/collections/reds' collId={redsId}>
        Shop all reds
      </OutlinedHeroLinkButton>
      <OutlinedHeroLinkButton
        color='darkGold'
        route='/collections/whites'
        collId={whitesId}
      >
        Shop all whites
      </OutlinedHeroLinkButton>
      <OutlinedHeroLinkButton
        color='darkPink'
        route='/collections/roses'
        collId={rosesId}
      >
        Shop all rosés
      </OutlinedHeroLinkButton>
    </Container>
  );
}
