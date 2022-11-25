import { useRoutes } from "react-router-dom";
import React from "react";
import PC1 from "./PC-1";

export const PCRoutes = () => {
    return useRoutes([
        {
            index: true,
            element: <PCBase />
        },
        {
            path: 'pc1',
            element: <PC1 />
        }
    ])
}

const PCBase = () => {
    return (
        <div>PC Base</div>
    )
}