import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import ScatterPlotBrush from "./scatter-plot-with-brush/ScatterPlotBrushComponent";
import ScatterPlotBrushZoom from "./scatter-plot-brush-zoom/ScatterPlotBrushZoomComponent";
import ScatterPlotGrouped from "./scatter-plot-grouped/ScatterPlotGrouped";
import ScatterPlotBasic from "./scatter-plot-basic/ScatterPlotBasicComponent";

const ScatterPlotsBase = () => {
    return (
        <Box>
            Scatter Plots Base
        </Box>
    )
}

export const ScatterChartsRoutes = () => {
    return useRoutes([
        {
            index: true,
            element: <ScatterPlotsBase />
        },
        {
            path: 'scatter-plot-brush',
            element: <ScatterPlotBrush />
        },
        {
            path: 'scatter-plot-brush-zoom',
            element: <ScatterPlotBrushZoom />
        },
        {
            path: 'scatter-plot-group',
            element: <ScatterPlotGrouped />
        },
        {
            path: 'scatter-plot-basic',
            element: <ScatterPlotBasic />
        }
    ]);
}