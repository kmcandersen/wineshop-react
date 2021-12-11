import React from 'react';
import { Box, Container } from '@mui/material';
import Cart from '../pages/Cart';
import Footer from './Footer';
import Navbar from './Navbar';

const styles = {
  container: {
    height: `calc(100vh-65px)`,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mt: `calc(65px + 60px)`,
    mb: '80px',
  },
};

export default function Layout(props) {
  return (
    <Box>
      <Navbar />
      <Cart />
      <Container maxWidth='md' sx={styles.container}>
        {props.children}
      </Container>
      <Footer />
    </Box>
  );
}
