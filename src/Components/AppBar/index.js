import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from "react-redux";
import { toggleOrSetSidebar } from '../../Store/sidebarSlice';
import ThemeSetter from '../ThemeSetter';
import styled from '@emotion/styled';

const AppBar = styled((props) => (
  <MuiAppBar { ...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#4c7fa8'
}));

export default function AppBarHeader() {
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 0, mr: 4 }}
            onClick={() => dispatch(toggleOrSetSidebar())}
          >
            <MenuIcon />
          </IconButton>
          <ThemeSetter />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
