import { useLocation, useRoutes } from "react-router-dom";
import React from "react";
import AreaChartComponent1 from "./area-chart-1/area-chart-component";
import DensityAreaChart from "./density-chart/density-chart-component";
import FilledAreaChart from "./filled-area/filled-area-chart-component";
import RidgelineChart from "./ridgeline-chart/RidgelineChartComponent";
import ContourDensityChart from "./contour-density-chart/ContourDensityChartComponent";
import HexbinDensityChart from "./hexbin-density/HexbinDensityChartComponent";
import Default404Component from "../../404Component";

export const AreaChartsRoutes = () => {
    const location = useLocation();
    return useRoutes([
        // {
        //     index: true,
        //     element: <AreaChartsDefault />
        // },
        {
            path: 'area-chart-1',
            element: <AreaChartComponent1 />
        },
        {
            path: 'density-chart',
            element: <DensityAreaChart />
        },
        {
            path: 'filled-area',
            element: <FilledAreaChart />
        },
        {
            path: 'ridgeline',
            element: <RidgelineChart />
        },
        {
            path: 'contour-density',
            element: <ContourDensityChart />
        },
        {
            path: 'hexbin-density',
            element: <HexbinDensityChart />
        },
        {
            path: '*',
            element: <Default404Component />
        },
    ], location)
}
