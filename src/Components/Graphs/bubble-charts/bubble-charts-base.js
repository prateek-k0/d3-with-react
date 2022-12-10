import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import BasicCircularPacking from "./BasicCircularPacking/BasicCircularPackingComponent";
import BubbleForceSimulation from "./BubbleForceSimulation/BubbleForceSimulationComponent";
import ZoomableCircularPacking from "./ZoomableCircularPacking/ZoomableCircularPackingComponent";
import BubbleChartScatterPlot from "./BubbleChartScatter/BubbleChartScatterComponent";

const BubbleChartsDefault = () => {
    return (
        <Box>
            No such bubble chart found
        </Box>
    )
}

export const BubbleChartsRoutes = () => {
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
            element: <BubbleChartsDefault />
        },
    ]);
}