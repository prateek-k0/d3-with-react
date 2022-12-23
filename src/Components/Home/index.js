import React from "react";
import HomepageLogo from "./homepage-logo";
import ThumbnailMasonry from "./thumbnail-masonry-layout";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import './styles.css'

const HomepageComponent = () => {
    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '50px 0', fontFamily: '"ABeeZee", sans-serif'}}>
            <Box sx={{margin: '0 0 40px'}}>
                <HomepageLogo renderHeight={512} dimHeight={256} />
            </Box>
            Typography
            <ThumbnailMasonry />
        </Box>
    );
}

export default HomepageComponent;