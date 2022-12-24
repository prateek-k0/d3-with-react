import { useRoutes } from "react-router-dom";
import React from "react";
import ArcDiagramMouseEvents from "./arc-diagram-with-mouse-events/ArcDiagramMouseEventsComponent";
import ArcDiagramBasic from "./arc-diagram-basic/ArcDiagramBasicComponent";
import ArcDiagramVertical from "./arc-diagram-vertical/ArcDiagramVerticalComponent";
import Default404Component from "../../404Component";

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
            element: <Default404Component />
        },
    ]);
}