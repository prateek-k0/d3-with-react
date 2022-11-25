import { useRoutes } from "react-router-dom";
import React from "react";
import BC1 from "./BC-1";

export const BCRoutes = () => {
    return useRoutes([
        {
            index: true,
            element: <BCBase />
        },
        {
            path: 'bc1',
            element: <BC1 />
        }
    ])
}

const BCBase = () => {
    return (
        <div>BC Base</div>
    )
}