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
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Divider from '@mui/material/Divider';
import { Link as RouterLink } from 'react-router-dom'

const AppBar = styled((props) => (
  <MuiAppBar { ...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#023673'
}));

export default function AppBarHeader() {
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0 8px' }} >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 0, mr: 0, width: '52px', height: '52px' }}
              onClick={() => dispatch(toggleOrSetSidebar())}
            >
              <MenuIcon />
            </IconButton>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: '#ffffff7f', marginTop: '12px', marginBottom: '12px' }} />
            <RouterLink to='/' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffffef'}}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ ml: 0, mr: 0, width: '52px', height: '52px' }}
              >
                <HomeIcon sx={{ width: '28px', height: '28px' }}/>
              </IconButton>
            </RouterLink>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0' }}>
            <Link href='https://github.com/prateek-k0/d3-chart-library' underline='none' target='_blank' rel='noopener' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffffef'}}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ ml: 0, mr: 0, padding: '10px' }}
              >
                <GitHubIcon sx={{ width: '32px', height: '32px' }}/>
              </IconButton>
            </Link>
            <ThemeSetter />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
