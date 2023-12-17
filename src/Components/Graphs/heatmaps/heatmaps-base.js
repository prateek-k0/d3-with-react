import { useLocation, Routes, Route } from "react-router-dom";
import React from "react";
import HeatmapBasic from "./heatmap-basic/HeatmapBasicComponent";
import HeatmapWithTooltip from "./heatmap-tooltip/HeatmapTooltipComponent";
import Default404Component from "../../404Component";

const routes = [
    { path: '*', element: <Default404Component /> },
    { path: 'basic', element: <HeatmapBasic /> },
    { path: 'heatmap-with-tooltip', element: <HeatmapWithTooltip /> },
]

export const HeatmapsRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.key}>
            {routes.map((route) => (
                <Route path={route.path} element={route.element} key={route.path} />
            ))}
        </Routes>
    )
}