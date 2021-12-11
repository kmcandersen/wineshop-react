import React from 'react';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
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
    mb: '80px',
  },
};

export default function Layout(props) {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <Navbar />
      <Cart />
      <Container
        maxWidth='md'
        sx={{
          ...styles.container,
          mt: `${smScreen ? `calc(65px + 40px)` : `calc(65px + 60px)`}`,
        }}
      >
        {props.children}
      </Container>
      <Footer />
    </Box>
  );
}
