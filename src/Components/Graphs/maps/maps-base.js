import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import MapBasic from "./map-basic/MapBasicComponent";
import ChoroplethMap from "./choropleth-map/ChoroplethMapComponent";
import CountryMapIndia from "./Country Map - India/CountryMapComponent";

const MapsDefault = () => {
    return (
        <Box>
            no such map found
        </Box>
    )
}

export const MapsRoutes = () => {
    return useRoutes([
        {
            path: '*',
            element: <MapsDefault />
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