import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import HeatmapBasic from "./heatmap-basic/HeatmapBasicComponent";
import HeatmapWithTooltip from "./heatmap-tooltip/HeatmapTooltipComponent";

const HeatmapsDefault = () => {
    return (
        <Box>
            no such heatmap found
        </Box>
    )
}

export const HeatmapsRoutes = () => {
    return useRoutes([
        {
            path: '*',
            element: <HeatmapsDefault />
        },
        {
            path: 'basic',
            element: <HeatmapBasic />
        },
        {
            path: 'heatmap-with-tooltip',
            element: <HeatmapWithTooltip />
        },
    ]);
}