import React from 'react';
// import { useLocation } from 'react-router-dom';
import { Box, Container, useMediaQuery } from '@mui/material';
import { BodyTextSpecial, PageHead } from './../components/AppText';
import { OutlinedGoHomeButton } from './../components/AppButton';
import customTheme from '../styles/theme';

const styles = {
  containerXS: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'left',
  },
  container: {
    textAlign: 'left',
  },
};

export default function NotFound() {
  // could be used to render more specific error messages:
  // const location = useLocation();
  // const message = location.state ? location.state.message : null;

  const xsScreen = useMediaQuery('(max-width:400px)');

  document.title = 'Page Not Found';

  return (
    <Container
      style={xsScreen ? { ...styles.containerXS } : { ...styles.container }}
    >
      <PageHead>Page not found</PageHead>
      <BodyTextSpecial>We can't find what you're looking for.</BodyTextSpecial>
      <Box sx={{ mt: customTheme.spacing(9) }}>
        <OutlinedGoHomeButton />
      </Box>
    </Container>
  );
}
