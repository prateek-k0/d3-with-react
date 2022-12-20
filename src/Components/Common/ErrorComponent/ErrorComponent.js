import React from 'react';
import { Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorComp = () => {
    return (
        <div>
            <ErrorOutlineIcon />
            <Typography>Error</Typography>
        </div>
    );
}

export default ErrorComp;