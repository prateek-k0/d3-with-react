import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import TreemapBasic from "./treemap-basic/TreemapBasicComponent";

const TreemapsDefault = () => {
    return (
        <Box>
            no such treemap found
        </Box>
    )
}

export const TreemapsRoutes = () => {
    return useRoutes([
        {
            path: '*',
            element: <TreemapsDefault />
        },
        {
            path: 'basic',
            element: <TreemapBasic />
        },
    ]);
}