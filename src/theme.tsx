// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     background: {
//       default: '#1a1a1a', 
//       paper: '#333333', 
//     },
//     text: {
//       primary: '#ffffff',
//     },
//     primary: {
//       main: '#1976d2', 
//       dark: '#115293', 
//     },
//   },
//   components: {

//     MuiCard: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#333333',
//         },
//       },
//     },
//   },
// });

// export default theme;
// theme.js
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#ffffff',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
    },
  },
});
