import { useLocation, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import LoadingComp from "../../Common/LoadingComponent/LoadingComponent";

const routes = [
    { path: 'area-chart-1', element: import('./area-chart-1/area-chart-component') },
    { path: 'density-chart', element: import('./density-chart/density-chart-component') },
    { path: 'filled-area', element: import('./filled-area/filled-area-chart-component') },
    { path: 'ridgeline', element: import('./ridgeline-chart/RidgelineChartComponent') },
    { path: 'contour-density', element: import('./contour-density-chart/ContourDensityChartComponent') },
    { path: 'hexbin-density', element: import('./hexbin-density/HexbinDensityChartComponent') },
    { path: '*', element: import('../../404Component') },
]

export const AreaChartsRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.key}>
            {routes.map((route) => {
                const LazyElement = React.lazy(() => route.element);
                return (
                    <Route
                        path={route.path}
                        element={<Suspense fallback={<LoadingComp />}> <LazyElement /> </Suspense>}
                        key={route.path} 
                    />
                )
            })}
        </Routes>
    )
}
