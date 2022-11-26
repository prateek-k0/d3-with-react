import { Outlet } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar'
import Box from '@mui/material/Box';
import AppBarHeader from "../AppBar";

const AppLayout = () => {
    return (
        <>
            <AppBarHeader />
            <Sidebar />
            <Box sx={{width: '100%', 
                height: 'calc(100vh - 64px)',
                maxHeight: 'calc(100vh - 64px)',
                backgroundColor: '#ffffff01'
            }}>
                <Outlet />
            </Box>
        </>
    )
}

export default AppLayout;