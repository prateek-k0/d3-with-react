import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import AreaChartComponent1 from "./area-chart-1/area-chart-component";
import DensityAreaChart from "./density-chart/density-chart-component";

export const AreaChartsRoutes = () => {
    return useRoutes([
        {
            index: true,
            element: <AreaChartsBase />
        },
        {
            path: 'area-chart-1',
            element: <AreaChartComponent1 />
        },
        {
            path: 'density-chart',
            element: <DensityAreaChart />
        }
    ])
}

const AreaChartsBase = () => {
    return (
        <Box>
            Area Charts Base
        </Box>
    )
}