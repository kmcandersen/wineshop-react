import React from 'react';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import Alert from './Alert';
import Cart from '../pages/Cart';
import Footer from './Footer';
import Hero from './Hero';
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
      <Alert
        message='This is a demo store that does not offer goods for purchase.'
        colorBg={theme.palette.grey[800]}
        colorText={theme.palette.common.white}
      />
      <Navbar />
      <Cart />
      <Hero />
      <Container
        maxWidth='md'
        sx={{
          ...styles.container,
        }}
      >
        {props.children}
      </Container>
      <Footer />
    </Box>
  );
}
