import { useRoutes } from "react-router-dom";
import React from "react";
import MapBasic from "./map-basic/MapBasicComponent";
import ChoroplethMap from "./choropleth-map/ChoroplethMapComponent";
import CountryMapIndia from "./Country Map - India/CountryMapComponent";
import Default404Component from "../../404Component";

export const MapsRoutes = () => {
    return useRoutes([
        {
            path: '*',
            element: <Default404Component />
        },
        {
            path: 'basic',
            element: <MapBasic />
        },
        {
            path: 'choropleth',
            element: <ChoroplethMap />
        },
        {
            path: 'country-map-india',
            element: <CountryMapIndia />
        },
    ]);
}