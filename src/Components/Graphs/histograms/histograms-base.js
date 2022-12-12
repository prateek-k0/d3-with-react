import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import HistogramBasic from "./histogram-basic/HistogramBasicComponent";
import DoubleHistogram from "./double-histogram/DoubleHistogramComponent";

const HistogramsDefault = () => {
    return (
        <Box>
            no such histogram found found
        </Box>
    )
}

export const HistogramsRoutes = () => {
    return useRoutes([
        {
            path: '*',
            element: <HistogramsDefault />
        },
        {
            path: 'basic',
            element: <HistogramBasic />
        },
        {
            path: 'double-histogram',
            element: <DoubleHistogram />
        },
    ]);
}