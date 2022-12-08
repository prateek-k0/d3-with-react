import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import ArcDiagramMouseEvents from "./arc-diagram-with-mouse-events/ArcDiagramMouseEventsComponent";

const ArcChartsBase = () => {
    return (
        <Box>
            Arc Charts Base
        </Box>
    )
}

export const ArcChartsRoutes = () => {
    return useRoutes([
        {
            index: true,
            element: <ArcChartsBase />
        },
        {
            path: 'arc-diagram-mouse',
            element: <ArcDiagramMouseEvents />
        }
    ]);
}