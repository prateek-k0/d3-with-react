import { useRoutes } from "react-router-dom";
import React from "react";
import TreemapBasic from "./treemap-basic/TreemapBasicComponent";
import Default404Component from "../../404Component";

export const TreemapsRoutes = () => {
    return useRoutes([
        {
            path: '*',
            element: <Default404Component />
        },
        {
            path: 'basic',
            element: <TreemapBasic />
        },
    ]);
}