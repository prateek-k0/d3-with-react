import React from "react";
import HomepageLogo from "./homepage-logo";
import ThumbnailMasonry from "./thumbnail-masonry-layout";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import './styles.css'

const HomepageComponent = () => {
    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '50px 0' }}>
            <Box sx={{margin: '0 0 10px'}}>
                <HomepageLogo renderHeight={512} dimHeight={256} />
            </Box>
            <Typography sx={{ fontSize: '36px', margin: '0 0 30px', fontFamily: '"ABeeZee", sans-serif', lineHeight: '52px' }}>
                D3.js Chart Library
            </Typography>
            <Typography sx={{ fontSize: '24px', margin: '0 0 40px', width: '600px', textAlign: 'center', fontFamily: '"ABeeZee", sans-serif' }}>
                A small collection of charts made with D3. 
            </Typography>
            <Typography sx={{ fontSize: '20px', margin: '20px 0 20px', width: '720px', textAlign: 'center', fontWeight: '300', fontFamily: 'system-ui' }}>
                Below are featured a few of the graphs. You can also navigate using the sidebar for all the available ones with type segregation.
            </Typography>
            <ThumbnailMasonry />
        </Box>
    );
}

export default HomepageComponent;