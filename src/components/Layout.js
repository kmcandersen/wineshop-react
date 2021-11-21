import React from 'react';
import { Container } from '@mui/material';
import Cart from './Cart';
import Navbar from './Navbar';

const styles = {
  appContainer: {
    height: '100vh',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    py: '64px',
    my: '9vh',
    height: '91vh',
    border: '1px solid red',
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
