import React from 'react';
import { Container } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import Navbar from './Navbar';

const styles = {
  background: {
    backgroundColor: blueGrey[50],
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    py: '64px',
  },
};
export default function Layout(props) {
  return (
    <div style={{ ...styles.background }}>
      <Navbar />
      <Container maxWidth='md' sx={{ ...styles.container }}>
        {props.children}
      </Container>
    </div>
  );
}
