import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';


const theme = createTheme({
    palette: {
      primary: {
        main: '#005689',
        light: '#fc8d62'
      },
      secondary: {
        main: '#318CE7',  //loght blue - savings page
        light: '#66c2a5', //green - income
        dark: '#fc8d62', //orange - expense
      },
      success: {
        main: '#4caf50'
      },
      dark: {
        main: '#005689',
        contrastText: '#eef7ff'
      }
    },
    typography: {
      // fontFamily: 'Quicksand',
      // fontWeightLight: 400,
      // fontWeightRegular: 500,
      // fontWeightMedium: 600,
      // fontWeightBold: 700,
      fontSize: 16,
      h3: {
        fontWeight: 700,
        fontSize: '1.9rem'
      },
      h4: {
        fontWeight: 500,
        fontSize: '1.75rem'
      },
      h5: {
        fontWeight: 500
      },
      h6: {
        fontWeight: 500
      }
    }
  })

  export default theme;
