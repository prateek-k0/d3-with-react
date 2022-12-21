import React from 'react';
import { Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './error-styles.css';

const ErrorComp = ({ errorText }) => {
    return (
        <div className="main-wrapper-error">
            <div className='icon-wrapper-error'>
                <ErrorOutlineIcon sx={{fontSize: '96px'}} />
            </div>
            <Typography sx={{fontSize: '24px', padding: '10px', fontWeight: '400', fontFamily: '"ABeeZee", sans-serif'}}>{errorText || 'Error!'}</Typography>
        </div>
    );
}

export default ErrorComp;