import { useLocation, useRoutes } from "react-router-dom";
import React from "react";
import HistogramBasic from "./histogram-basic/HistogramBasicComponent";
import DoubleHistogram from "./double-histogram/DoubleHistogramComponent";
import Default404Component from "../../404Component";

export const HistogramsRoutes = () => {
    const location = useLocation();
    return useRoutes([
        {
            path: '*',
            element: <Default404Component />
        },
        {
            path: 'basic',
            element: <HistogramBasic />
        },
        {
            path: 'double-histogram',
            element: <DoubleHistogram />
        },
    ], location);
}