import { useRoutes } from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import BasicCircularPacking from "./BasicCircularPacking/BasicCircularPackingComponent";

const BubbleChartsBase = () => {
    return (
        <Box>
            Bubble Charts Base
        </Box>
    )
}

export const BubbleChartsRoutes = () => {
    return useRoutes([
        {
            index: true,
            element: <BubbleChartsBase />
        },
        {
            path: 'circular-packing-basic',
            element: <BasicCircularPacking />
        }
    ]);
}