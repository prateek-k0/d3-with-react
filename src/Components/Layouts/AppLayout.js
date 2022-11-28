import { Outlet } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar'
import MuiBox from '@mui/material/Box';
import AppBarHeader from "../AppBar";
import styled from "@emotion/styled";

const Box = styled(MuiBox)(({ theme }) => ({
    width: '100%', 
    height: 'calc(100vh - 64px)',
    maxHeight: 'calc(100vh - 64px)',
    backgroundColor: '#ffffff01',
    overflow: 'auto',
    // scrollbar
    '&::-webkit-scrollbar': {
        width: '10px',
        height: '10px'
    },
    '&::-webkit-scrollbar-track': {
        // boxShadow: theme.palette.mode === 'dark' ? 'inset 0 0 7px #ffffff90' : 'inset 0 0 7px #00000080',
        opacity: 0
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'darkgrey',
    },
}));

const AppLayout = () => {
    return (
        <>
            <AppBarHeader />
            <Sidebar />
            <Box>
                <Outlet />
            </Box>
        </>
    )
}

export default AppLayout;