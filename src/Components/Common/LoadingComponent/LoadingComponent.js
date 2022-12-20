import React from 'react';
import { Typography } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';

const LoadingComp = () => {
    return (
        <div>
            <LoopIcon />
            <Typography>Loading</Typography>
        </div>
    );
}

export default LoadingComp