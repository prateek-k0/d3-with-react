import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import BarChart from "./bar-chart-1/Bar-Chart-1";

export const BarChartsRoutes = () => {
    return useRoutes([
        {
            index: true,
            element: <BarChartsBase />
        },
        {
            path: 'bar-chart-1',
            element: <BarChart />
        }
    ])
}

const BarChartsBase = () => {
    return (
        <Box>
            Bar Charts Base
        </Box>
    )
}