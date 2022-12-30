import React from "react";
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import '@fontsource/abeezee/400.css';
import error404Image from './404-image.png';
import HomeIcon from '@mui/icons-material/Home';

const Default404Component = () => {
    return (
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '80px 0 40px'}}>
            <img src={error404Image} alt='404-error' width={600}/>
            <Typography sx={{fontSize: '24px', fontFamily: '"ABeeZee", sans-serif', margin: '80px 0 40px', textAlign: 'center'}}>
                It is recommended to use the sidebar for navigating through the graphs.
            </Typography>
            <Button startIcon={<HomeIcon sx={{marginTop: '-2px', fontSize: '26px !important'}} />} variant='contained' size="large" sx={{padding: '12px 60px', fontFamily: '"ABeeZee", sans-serif'}} component={Link} to="/">
                Homepage
            </Button>
        </Box>
    )
}

export default Default404Component