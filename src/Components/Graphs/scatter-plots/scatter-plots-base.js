import { useLocation, Routes, Route } from "react-router-dom";
import React from "react";
import ScatterPlotBrush from "./scatter-plot-with-brush/ScatterPlotBrushComponent";
import ScatterPlotBrushZoom from "./scatter-plot-brush-zoom/ScatterPlotBrushZoomComponent";
import ScatterPlotGrouped from "./scatter-plot-grouped/ScatterPlotGrouped";
import ScatterPlotBasic from "./scatter-plot-basic/ScatterPlotBasicComponent";
import Default404Component from "../../404Component";

const routes = [
    { path: 'scatter-plot-brush', element: <ScatterPlotBrush /> },
    { path: 'scatter-plot-brush-zoom', element: <ScatterPlotBrushZoom /> },
    { path: 'scatter-plot-group', element: <ScatterPlotGrouped /> },
    { path: 'scatter-plot-basic', element: <ScatterPlotBasic /> },
    { path: '*', element: <Default404Component /> },
]

export const ScatterChartsRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.key}>
            {routes.map((route) => (
                <Route path={route.path} element={route.element} key={route.path} />
            ))}
        </Routes>
    );
}