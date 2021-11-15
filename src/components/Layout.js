import React from 'react';
import { Container } from '@mui/material';
import Cart from './Cart';
import Navbar from './Navbar';

const styles = {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    py: '64px',
  },
};
export default function Layout(props) {
  return (
    <div>
      <Navbar />
      <Cart />
      <Container maxWidth='md' sx={{ ...styles.container }}>
        {props.children}
      </Container>
    </div>
  );
}
