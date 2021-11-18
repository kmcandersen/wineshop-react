import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#525252', // darkGray
    },
    secondary: {
      main: '#B71010', // maroon
    },
    maroon: { main: '#B40808' }, // passes AAA normal text
    darkMaroon: { main: '#9D1D20' },
    gold: { main: '#D9A92A' },
    darkGold: { main: '#B98604' }, // passes AA normal text
    pink: { main: '#EA9999' },
    darkPink: { main: '#C47E7E' }, // passes AA large text
    darkGray: { main: '#525252' },
    mediumGray: { main: '#6B6B6B' }, // passes AA large text
    lightGray: { main: '#F4F4F4' },
    black: { main: '#000' },
    white: { main: '#fff' },
  },
  typography: {
    fontFamily: '"Lato", "Helvetica", "Arial", sans-serif',
  },
});

export default customTheme;
