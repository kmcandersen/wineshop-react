import React from 'react';
import { Box, Button, Container, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import customTheme from './../styles/theme.js';

const styles = {
  footerBar: {
    backgroundColor: customTheme.palette.lightGray.main,
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
};

export default function Footer() {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        mt: '100px',
      }}
    >
      <Box sx={styles.footerBar}>
        <Container maxWidth='md'>
          <Grid
            container
            direction={{ xs: 'column', sm: 'row' }}
            columns={2}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              py: customTheme.spacing(3),
            }}
          >
            <Grid
              item
              sx={{
                ...styles.flex,
                flexDirection: 'column',
                mx: customTheme.spacing(4),
              }}
            >
              <Button variant='text'>About Us</Button>
              <Button variant='text'>Customer Service</Button>
            </Grid>
            <Grid
              item
              sx={{
                ...styles.flex,
                flexDirection: 'column',
                mx: customTheme.spacing(4),
              }}
            >
              <Button variant='text'>Shipping Guide</Button>
              <Button variant='text'>Returns & Exchanges</Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box>
        <Container maxWidth='md'>
          <Grid
            container
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              ...styles.flex,
              width: '100%',
              py: customTheme.spacing(4),
            }}
          >
            <Grid
              container
              sx={{
                ...styles.flex,
                flexDirection: `${smScreen ? 'column' : 'row'}`,
              }}
            >
              <Grid item sx={{ ...styles.flexRow, mx: customTheme.spacing(3) }}>
                <Button
                  variant='text'
                  color='black'
                  sx={{
                    textTransform: 'capitalize',
                  }}
                >
                  Terms & Conditions
                </Button>
              </Grid>
              <Grid item sx={{ ...styles.flexRow, mx: customTheme.spacing(3) }}>
                <Button
                  variant='text'
                  color='black'
                  sx={{
                    textTransform: 'capitalize',
                  }}
                >
                  Privacy Policy
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
