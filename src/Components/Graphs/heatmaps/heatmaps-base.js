import { useRoutes } from "react-router-dom";
import React from "react";
import HeatmapBasic from "./heatmap-basic/HeatmapBasicComponent";
import HeatmapWithTooltip from "./heatmap-tooltip/HeatmapTooltipComponent";
import Default404Component from "../../404Component";

export const HeatmapsRoutes = () => {
    return useRoutes([
        {
            path: '*',
            element: <Default404Component />
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