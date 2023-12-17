import { useLocation, Route, Routes } from "react-router-dom";
import React from "react";
import BasicCircularPacking from "./BasicCircularPacking/BasicCircularPackingComponent";
import BubbleForceSimulation from "./BubbleForceSimulation/BubbleForceSimulationComponent";
import ZoomableCircularPacking from "./ZoomableCircularPacking/ZoomableCircularPackingComponent";
import BubbleChartScatterPlot from "./BubbleChartScatter/BubbleChartScatterComponent";
import Default404Component from "../../404Component";

const routes = [
    { path: 'circular-packing-basic', element: <BasicCircularPacking /> },
    { path: 'bubble-force-simulation', element: <BubbleForceSimulation /> },
    { path: 'circular-pack-zoom', element: <ZoomableCircularPacking /> },
    { path: 'bubble-scatter-plot', element: <BubbleChartScatterPlot /> },
    { path: '*', element: <Default404Component /> },
]

export const BubbleChartsRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.key}>
            {routes.map((route) => (
                <Route path={route.path} element={route.element} key={route.path} />
            ))}
        </Routes>
    )
}