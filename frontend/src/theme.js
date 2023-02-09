import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';


const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
        firstColor: '#005689',
        secondColor: '#007cb9',
        thirdColor: '#d5eeff',
        forthColor: '#ff895d',
        a: purple

      },
      secondary: {
        main: '#ff895d'
      },
      success: {
        main: '#4caf50'
      }
    },
    typography: {
      fontSize: 16,
      h3: {
        fontWeight: 700,
        fontSize: '2.2rem'
      },
      h4: {
        fontWeight: 700,
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