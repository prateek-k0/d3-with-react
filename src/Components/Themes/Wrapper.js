import { ThemeProvider } from '@mui/material/styles';
import React, { useCallback } from 'react'
import { useSelector } from "react-redux";
import CssBaseline from '@mui/material/CssBaseline';
import themeConfig from './Config';

const ThemeWrapper = ({ children }) => {
    const themeSelector = useCallback((state) => state.theme, []);
    const currTheme = useSelector(themeSelector);

    return (
        <ThemeProvider theme={themeConfig[currTheme.darkMode ? 'dark' : 'light']}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default ThemeWrapper;