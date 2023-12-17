import { useLocation, Routes, Route } from "react-router-dom";
import React from "react";
import AreaChartComponent1 from "./area-chart-1/area-chart-component";
import DensityAreaChart from "./density-chart/density-chart-component";
import FilledAreaChart from "./filled-area/filled-area-chart-component";
import RidgelineChart from "./ridgeline-chart/RidgelineChartComponent";
import ContourDensityChart from "./contour-density-chart/ContourDensityChartComponent";
import HexbinDensityChart from "./hexbin-density/HexbinDensityChartComponent";
import Default404Component from "../../404Component";

const routes = [
    { path: 'area-chart-1', element: <AreaChartComponent1 /> },
    { path: 'density-chart', element: <DensityAreaChart /> },
    { path: 'filled-area', element: <FilledAreaChart /> },
    { path: 'ridgeline', element: <RidgelineChart /> },
    { path: 'contour-density', element: <ContourDensityChart /> },
    { path: 'hexbin-density', element: <HexbinDensityChart /> },
    { path: '*', element: <Default404Component /> },
]

export const AreaChartsRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.key}>
            {routes.map((route) => (
                <Route path={route.path} element={route.element} key={route.path} />
            ))}
        </Routes>
    )
}
