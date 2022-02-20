import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../config/initClient.js';
import collectionIds from '../config/collectionIds.js';
import Hero from '../components/Hero';
import ImageTextGroup from '../components/ImageTextGroup';
import ProductCardGroup from '../components/ProductCardGroup';

export default function Home() {
  const [collection, setCollection] = useState({});
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

  document.title = 'Welcome to wineshop';

  return (
    <>
      <Hero />
      <ImageTextGroup />
      <ProductCardGroup
        items={collection.products}
        headerText='Favorite Summer Sips'
      />
    </>
  );
}
