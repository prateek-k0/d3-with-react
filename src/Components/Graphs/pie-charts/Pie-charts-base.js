import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import PieChartWithLabels from "./pie-chart-labels/PieChartWithLabelsComponent";
import PieChartPercentageDistribution from "./pie-chart-percentage-distribution/PieChartComponent";

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
        {
            path: 'pie-chart-perc-distribution',
            element: <PieChartPercentageDistribution />
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