import { createTheme } from '@mui/material/styles';

const uiBlack = '#1E1E1E';

const customTheme = createTheme({
  palette: {
    common: {
      black: uiBlack,
    },
    primary: {
      main: '#525252', // darkGrayText
    },
    secondary: {
      main: '#B71010', // maroon
    },
    error: {
      main: '#B71010', // maroon
    },
    maroon: { main: '#B40808' }, // passes AAA normal text
    darkMaroon: { main: '#9D1D20' },
    gold: { main: '#D9A92A' },
    darkGold: { main: '#B98604' }, // passes AA normal text
    pink: { main: '#EA9999' },
    darkPink: { main: '#C47E7E' }, // passes AA large text
    darkGrayText: { main: '#525252' },
    mediumGrayText: { main: '#6B6B6B' }, // passes AA large text
    lightGray: { main: '#DBDBDB' },
    // for dynamic color prop names
    black: { main: uiBlack },
    white: { main: '#fff' },
  },
  spacing: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
  typography: {
    fontFamily: '"Lato", "Helvetica", "Arial", sans-serif',
  },
});

export default customTheme;
