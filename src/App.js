import React from "react";
import Sidebar from './Components/Sidebar/Sidebar'
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { toggleOrSetSidebar } from "./Store/sidebarSlice";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { toggleOrSetTheme } from "./Store/themeSlice";
import { useSelector } from "react-redux";
import Switch from '@mui/material/Switch';
import { FormGroup, FormControlLabel } from "@mui/material";

const themeSet = {
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

const getTheme = (state) => state.theme

const App = () => {
  const dispatch = useDispatch();
  const currTheme = useSelector(getTheme);

  return (
    <ThemeProvider theme={themeSet[currTheme.darkMode ? 'dark' : 'light']}>
      <CssBaseline /> 
      <div className="App">
        <Sidebar />
        <Button onClick={() => dispatch(toggleOrSetSidebar())}>SIDEBAR</Button>
        <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={currTheme.darkMode}
              onChange={() => dispatch(toggleOrSetTheme())}
            />
          }
          label="Dark mode" />
        </FormGroup>
      </div>
    </ThemeProvider>
  );
}

export default App;
