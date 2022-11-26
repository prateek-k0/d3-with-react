import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';

export const PieChartsRoutes = () => {
    return useRoutes([
        {
            index: true,
            element: <PieChartsBase />
        },
    ])
}

const PieChartsBase = () => {
    return (
        <Box>
            Pie Charts Base
        </Box>
    )
}