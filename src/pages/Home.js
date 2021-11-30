import React, { useContext, useEffect } from 'react';
import { Container } from '@mui/material';
import ShopContext from '../context/shopContext';
import { OutlinedLinkButton } from '../components/AppButton';

const redsId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIxMjgzOTEwNDY3NQ==';
const whitesId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIxMjgzOTIwMjk3OQ==';
const rosesId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIxMjgzOTE3MDIxMQ==';
// summer-sips
const featuredId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIxMzE5MTUyNDUxNQ==';

export default function Home() {
  const { fetchCollection } = useContext(ShopContext);

  useEffect(() => fetchCollection(featuredId), [fetchCollection]);

  return (
    <Container>
      <OutlinedLinkButton
        route='/collections/reds'
        clickHandler={() => fetchCollection(redsId)}
      >
        Shop all reds
      </OutlinedLinkButton>
      <OutlinedLinkButton
        color='darkGold'
        route='/collections/whites'
        clickHandler={() => fetchCollection(whitesId)}
      >
        Shop all whites
      </OutlinedLinkButton>
      <OutlinedLinkButton
        color='darkPink'
        route='/collections/roses'
        clickHandler={() => fetchCollection(rosesId)}
      >
        Shop all rosés
      </OutlinedLinkButton>
    </Container>
  );
}
