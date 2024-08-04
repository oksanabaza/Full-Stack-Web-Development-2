import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#1a1a1a', 
      paper: '#333333', 
    },
    text: {
      primary: '#ffffff',
    },
    primary: {
      main: '#1976d2', 
      dark: '#115293', 
    },
  },
  components: {

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#333333',
        },
      },
    },
  },
});

export default theme;