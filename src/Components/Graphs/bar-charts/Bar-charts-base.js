import { useRoutes } from "react-router-dom";
import React from "react";
import BarChart from "./bar-chart-1/Bar-Chart-1";
import StackedBarChartComponent from "./Stacked Bar Chart/StackedBarChartComponent";
import ClusteredBarChart from "./clustered-bar-chart/ClusteredBarChartComponent";
import HorizontalBarChart from "./horizontal-bar-chart/HorizontalBarChartComponet";
import DottedBarChart from "./dotted-bar-charts/DottedBarChartComponent";
import RacingBarChart from "./racing-bar-chart/RacingBarChartComponent";
import Default404Component from "../../404Component";

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
            path: 'racing',
            element: <RacingBarChart />
        },
        {
            path: '*',
            element: <Default404Component />
        },
    ])
}
