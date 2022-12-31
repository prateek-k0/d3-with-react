import React from 'react';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import './loading-styles.css';

const LoadingComp = ({ loadingText }) => {
    return (
        <div className="main-wrapper">
            <div className='icon-wrapper'>
                <CircularProgress sx={{width: '88px !important', height: '88px !important'}}/>
            </div>
            
            <Typography sx={{fontSize: '24px', padding: '10px', fontWeight: '400', fontFamily: '"ABeeZee", sans-serif'}}>{loadingText || 'Loading ...'}</Typography>
        </div>
    );
}

export default LoadingComp