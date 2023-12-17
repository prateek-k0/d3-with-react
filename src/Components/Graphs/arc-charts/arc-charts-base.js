import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import ArcDiagramMouseEvents from "./arc-diagram-with-mouse-events/ArcDiagramMouseEventsComponent";
import ArcDiagramBasic from "./arc-diagram-basic/ArcDiagramBasicComponent";
import ArcDiagramVertical from "./arc-diagram-vertical/ArcDiagramVerticalComponent";
import Default404Component from "../../404Component";

const routes = [
    { path: 'arc-diagram-mouse', element: <ArcDiagramMouseEvents /> },
    { path: 'arc-diagram-basic', element: <ArcDiagramBasic /> },
    { path: 'arc-diagram-vertical', element: <ArcDiagramVertical /> },
    { path: '*', element: <Default404Component /> },
]

export const ArcChartsRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.key}>
            {routes.map((route) => (
                <Route path={route.path} element={route.element} key={route.path} />
            ))}
        </Routes>
    )
}