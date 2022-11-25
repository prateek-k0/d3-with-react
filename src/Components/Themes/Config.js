import { createTheme } from '@mui/material/styles';

const themeConfig = {
    light: createTheme({
      palette: {
        mode: 'light',
      },
    }),
    dark: createTheme({
      palette: {
        mode: 'dark',
      },
    })
}

export default themeConfig;