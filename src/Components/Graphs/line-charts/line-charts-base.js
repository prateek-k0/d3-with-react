import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import LineChartBasic from "./line-chart-basic/LineChartsBasic";
import MultiLineChart from "./multi-line-chart/MultiLineChartComponent";
import LineChartGradient from "./line-chart-gradient/LineChartGradientComponent";
import LineChartBrushed from "./line-chart-brushed/LineChartBrushedComponent";

const LineChartsBase = () => {
    return (
        <Box>
            Line Charts Base
        </Box>
    )
}

export const LineChartsRoutes = () => {
    return useRoutes([
        {
            index: true,
            element: <LineChartsBase />
        },
        {
            path: 'line-chart-basic',
            element: <LineChartBasic />
        },
        {
            path: 'multi-line',
            element: <MultiLineChart />
        },
        {
            path: 'line-chart-gradient',
            element: <LineChartGradient />
        },
        {
            path: 'line-chart-brushed',
            element: <LineChartBrushed />
        },
    ]);
}
