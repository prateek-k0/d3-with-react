import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import BasicCircularPacking from "./BasicCircularPacking/BasicCircularPackingComponent";
import BubbleForceSimulation from "./BubbleForceSimulation/BubbleForceSimulationComponent";
import ZoomableCircularPacking from "./ZoomableCircularPacking/ZoomableCircularPackingComponent";

const BubbleChartsBase = () => {
    return (
        <Box>
            Bubble Charts Base
        </Box>
    )
}

export const BubbleChartsRoutes = () => {
    return useRoutes([
        {
            index: true,
            element: <BubbleChartsBase />
        },
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
        }
    ]);
}