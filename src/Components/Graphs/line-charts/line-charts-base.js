import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import LineChartBasic from "./line-chart-basic/LineChartsBasic";
import MultiLineChart from "./multi-line-chart/MultiLineChartComponent";
import LineChartGradient from "./line-chart-gradient/LineChartGradientComponent";
import LineChartBrushed from "./line-chart-brushed/LineChartBrushedComponent";
import LineChartMultipleInputs from "./line-chart-multiple-input/LineChartMultipleInput";
import MultipleCharts from "./multiple-charts/MultipleChartsComponent";

const LineChartDefault = () => {
    return (
        <Box>
            No such line chart found
        </Box>
    )
}

export const LineChartsRoutes = () => {
    return useRoutes([
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
        {
            path: 'line-chart-multiple-inputs',
            element: <LineChartMultipleInputs />
        },
        {
            path: 'multiple-charts',
            element: <MultipleCharts />
        },
        {
            path: '*',
            element: <LineChartDefault />
        },
    ]);
}
