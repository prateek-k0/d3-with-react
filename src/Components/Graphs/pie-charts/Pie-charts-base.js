import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import PieChartWithLabels from "./pie-chart-labels/PieChartWithLabelsComponent";
import PieChartPercentageDistribution from "./pie-chart-percentage-distribution/PieChartComponent";
import DonutChart from "./donut-chart/DonutChartComponent";
import SunburstChart from "./sunburst-chart/SunburstChartComponent";
import ZoomableSunburst from "./zoomable-sunburst/ZoomableSunburstComponent";
import ChordChartColored from "./chord-chart-colored/ChordChartColoredComponent";
import ChordChartLabeled from "./chord-chart-labeled/ChordChartLabeledComponent";

export const PieChartsRoutes = () => {
    return useRoutes([
        {
            path: 'pie-chart-labels',
            element: <PieChartWithLabels />
        },
        {
            path: 'pie-chart-perc-distribution',
            element: <PieChartPercentageDistribution />
        },
        {
            path: 'donut-chart',
            element: <DonutChart />
        },
        {
            path: 'sunburst-chart',
            element: <SunburstChart />
        },
        {
            path: 'zoomable-sunburst',
            element: <ZoomableSunburst />
        },
        {
            path: 'chord-colored',
            element: <ChordChartColored />
        },
        {
            path: 'chord-labeled',
            element: <ChordChartLabeled />
        },
        {
            path: '*',
            element: <PieChartsDefault />
        },
    ]);
}

const PieChartsDefault = () => {
    return (
        <Box>
            No such pie chart found
        </Box>
    )
}