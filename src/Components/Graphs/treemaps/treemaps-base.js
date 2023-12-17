import { useLocation, Routes, Route } from "react-router-dom";
import React from "react";
import TreemapBasic from "./treemap-basic/TreemapBasicComponent";
import Default404Component from "../../404Component";

const routes = [
    { path: '*', element: <Default404Component /> },
    { path: 'basic', element: <TreemapBasic /> },
]

export const TreemapsRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.key}>
            {routes.map((route) => (
                <Route path={route.path} element={route.element} key={route.path} />
            ))}
        </Routes>
    );
}