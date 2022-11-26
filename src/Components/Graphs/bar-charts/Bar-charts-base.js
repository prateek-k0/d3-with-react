import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';

export const BarChartsRoutes = () => {
    return useRoutes([
        {
            index: true,
            element: <BarChartsBase />
        },
    ])
}

const BarChartsBase = () => {
    return (
        <Box>
            Bar Charts Base
        </Box>
    )
}