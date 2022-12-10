import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import ArcDiagramMouseEvents from "./arc-diagram-with-mouse-events/ArcDiagramMouseEventsComponent";
import ArcDiagramBasic from "./arc-diagram-basic/ArcDiagramBasicComponent";
import ArcDiagramVertical from "./arc-diagram-vertical/ArcDiagramVerticalComponent";

const ArcChartsDefault = () => {
    return (
        <Box>
            No such arc chart found
        </Box>
    )
}

export const ArcChartsRoutes = () => {
    return useRoutes([
        {
            path: 'arc-diagram-mouse',
            element: <ArcDiagramMouseEvents />
        },
        {
            path: 'arc-diagram-basic',
            element: <ArcDiagramBasic />
        },
        {
            path: 'arc-diagram-vertical',
            element: <ArcDiagramVertical />
        },
        {
            path: '*',
            element: <ArcChartsDefault />
        },
    ]);
}