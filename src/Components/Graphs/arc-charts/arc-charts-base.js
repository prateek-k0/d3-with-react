import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import ArcDiagramMouseEvents from "./arc-diagram-with-mouse-events/ArcDiagramMouseEventsComponent";
import ArcDiagramBasic from "./arc-diagram-basic/ArcDiagramBasicComponent";
import ArcDiagramVertical from "./arc-diagram-vertical/ArcDiagramVerticalComponent";

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
        },
        {
            path: 'arc-diagram-basic',
            element: <ArcDiagramBasic />
        },
        {
            path: 'arc-diagram-vertical',
            element: <ArcDiagramVertical />
        }
    ]);
}