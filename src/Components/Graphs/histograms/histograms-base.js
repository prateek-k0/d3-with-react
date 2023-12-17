import { useLocation, Routes, Route } from "react-router-dom";
import React from "react";
import HistogramBasic from "./histogram-basic/HistogramBasicComponent";
import DoubleHistogram from "./double-histogram/DoubleHistogramComponent";
import Default404Component from "../../404Component";

const routes = [
    { path: '*', element: <Default404Component /> },
    { path: 'basic', element: <HistogramBasic /> },
    { path: 'double-histogram', element: <DoubleHistogram /> },
]

export const HistogramsRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.key}>
            {routes.map((route) => (
                <Route path={route.path} element={route.element} key={route.path} />
            ))}
        </Routes>
    )
}