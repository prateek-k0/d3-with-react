import { useLocation, useRoutes } from "react-router-dom";
import React from "react";
import ScatterPlotBrush from "./scatter-plot-with-brush/ScatterPlotBrushComponent";
import ScatterPlotBrushZoom from "./scatter-plot-brush-zoom/ScatterPlotBrushZoomComponent";
import ScatterPlotGrouped from "./scatter-plot-grouped/ScatterPlotGrouped";
import ScatterPlotBasic from "./scatter-plot-basic/ScatterPlotBasicComponent";
import Default404Component from "../../404Component";

export const ScatterChartsRoutes = () => {
    const location = useLocation();
    return useRoutes([
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
        },
        {
            path: '*',
            element: <Default404Component />
        },
    ], location);
}