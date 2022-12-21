import React from 'react';
import { Typography } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import './loading-styles.css';
const LoadingComp = ({ loadingText }) => {
    return (
        <div className="main-wrapper">
            <div className='icon-wrapper'>
                <LoopIcon sx={{fontSize: '96px'}} />
            </div>
            {/* 
            <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" style={{background:'transparent', display:'block'}} width="100px" height="100px" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="none" stroke={isDarkMode ? '#fff' : '#000000de'} strokeWidth="10" r="35" strokeDasharray="165 57">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                </circle>
            </svg>
             */}
            <Typography sx={{fontSize: '24px', padding: '10px', fontWeight: '400', fontFamily: '"ABeeZee", sans-serif'}}>{loadingText || 'Loading ...'}</Typography>
        </div>
    );
}

export default LoadingComp