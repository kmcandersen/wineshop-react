import React from 'react';
import { Container } from '@mui/material';
import Cart from '../pages/Cart';
import Navbar from './Navbar';

const styles = {
  appContainer: {
    height: `calc(100vh-65px)`,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    mt: `calc(65px + 60px)`,
    mb: '60px',
    maxWidth: '100%',
  },
};

export default function Layout(props) {
  return (
    <div style={{ ...styles.appContainer }}>
      <Navbar />
      <Cart />
      <Container maxWidth='md' sx={{ ...styles.container }}>
        {props.children}
      </Container>
    </div>
  );
}
