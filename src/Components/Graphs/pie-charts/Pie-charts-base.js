import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import PieChartWithLabels from "./pie-chart-labels/PieChartWithLabelsComponent";

export const PieChartsRoutes = () => {
    return useRoutes([
        {
            index: true,
            element: <PieChartsBase />
        },
        {
            path: 'pie-chart-labels',
            element: <PieChartWithLabels />
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