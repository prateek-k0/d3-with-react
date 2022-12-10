import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import BarChart from "./bar-chart-1/Bar-Chart-1";
import StackedBarChartComponent from "./Stacked Bar Chart/StackedBarChartComponent";
import ClusteredBarChart from "./clustered-bar-chart/ClusteredBarChartComponent";
import HorizontalBarChart from "./horizontal-bar-chart/HorizontalBarChartComponet";
import DottedBarChart from "./dotted-bar-charts/DottedBarChartComponent";

export const BarChartsRoutes = () => {
    return useRoutes([
        {
            path: 'bar-chart-1',
            element: <BarChart />
        },
        {
            path: 'stacked-bar-chart',
            element: <StackedBarChartComponent />
        },
        {
            path: 'clustered-bar-chart',
            element: <ClusteredBarChart />
        },
        {
            path: 'horizontal-bar-chart',
            element: <HorizontalBarChart />
        },
        {
            path: 'dotted-bar-chart',
            element: <DottedBarChart />
        },
        {
            path: '*',
            element: <BarChartsDefault />
        },
    ])
}

const BarChartsDefault = () => {
    return (
        <Box>
            No such bar chart found
        </Box>
    )
}