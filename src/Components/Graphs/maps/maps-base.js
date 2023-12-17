import { useLocation, Routes, Route } from "react-router-dom";
import React from "react";
import MapBasic from "./map-basic/MapBasicComponent";
import ChoroplethMap from "./choropleth-map/ChoroplethMapComponent";
import CountryMapIndia from "./Country Map - India/CountryMapComponent";
import Default404Component from "../../404Component";

const routes = [
    { path: '*', element: <Default404Component /> },
    { path: 'basic', element: <MapBasic /> },
    { path: 'choropleth', element: <ChoroplethMap /> },
    { path: 'country-map-india', element: <CountryMapIndia /> },
]

export const MapsRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.key}>
            {routes.map((route) => (
                <Route path={route.path} element={route.element} key={route.path} />
            ))}
        </Routes>
    )
}