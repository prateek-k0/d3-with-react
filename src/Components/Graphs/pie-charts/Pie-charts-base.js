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
    ]);
}

const PieChartsBase = () => {
    return (
        <Box>
            Pie Charts Base
        </Box>
    )
}