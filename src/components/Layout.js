import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import Alert from './Alert';
import Cart from '../pages/Cart';
import Footer from './Footer';
import Home from '../pages/Home';
import Navbar from './Navbar';

export default function Layout(props) {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const styles = {
    container: {
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mt: '65px',
      pt: smScreen ? '45px' : '60px',
    },
  };

  return (
    <div style={{ height: '100%' }}>
      <Alert
        message='This is a demo store that does not offer goods for purchase.'
        colorBg={theme.palette.grey[800]}
        colorText={theme.palette.common.white}
      />
      <Navbar />
      <Cart />
      {location.pathname === '/' ? (
        <Home />
      ) : (
        <Container
          maxWidth='md'
          sx={{
            ...styles.container,
            minHeight: `calc(100vh - 65px - 280px)`,
          }}
        >
          {props.children}
        </Container>
      )}
      <Footer />
    </div>
  );
}
