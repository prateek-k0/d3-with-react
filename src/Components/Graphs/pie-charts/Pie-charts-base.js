import { useRoutes } from "react-router-dom";
import React from "react";
import PieChartWithLabels from "./pie-chart-labels/PieChartWithLabelsComponent";
import PieChartPercentageDistribution from "./pie-chart-percentage-distribution/PieChartComponent";
import DonutChart from "./donut-chart/DonutChartComponent";
import SunburstChart from "./sunburst-chart/SunburstChartComponent";
import ZoomableSunburst from "./zoomable-sunburst/ZoomableSunburstComponent";
import ChordChartColored from "./chord-chart-colored/ChordChartColoredComponent";
import ChordChartLabeled from "./chord-chart-labeled/ChordChartLabeledComponent";
import Default404Component from "../../404Component";

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
            element: <Default404Component />
        },
    ]);
}
