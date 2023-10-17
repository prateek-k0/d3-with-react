import { useLocation, useRoutes } from "react-router-dom";
import React from "react";
import BasicCircularPacking from "./BasicCircularPacking/BasicCircularPackingComponent";
import BubbleForceSimulation from "./BubbleForceSimulation/BubbleForceSimulationComponent";
import ZoomableCircularPacking from "./ZoomableCircularPacking/ZoomableCircularPackingComponent";
import BubbleChartScatterPlot from "./BubbleChartScatter/BubbleChartScatterComponent";
import Default404Component from "../../404Component";

export const BubbleChartsRoutes = () => {
    const location = useLocation();
    return useRoutes([
        {
            path: 'circular-packing-basic',
            element: <BasicCircularPacking />
        },
        {
            path: 'bubble-force-simulation',
            element: <BubbleForceSimulation />
        },
        {
            path: 'circular-pack-zoom',
            element: <ZoomableCircularPacking />
        },
        {
            path: 'bubble-scatter-plot',
            element: <BubbleChartScatterPlot />
        },
        {
            path: '*',
            element: <Default404Component />
        },
    ], location);
}