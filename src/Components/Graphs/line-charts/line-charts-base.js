import { useLocation, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import LoadingComp from "../../Common/LoadingComponent/LoadingComponent";

const routes = [
    { path: 'line-chart-basic', element: import('./line-chart-basic/LineChartsBasic') },
    { path: 'multi-line', element: import('./multi-line-chart/MultiLineChartComponent') },
    { path: 'line-chart-gradient', element: import('./line-chart-gradient/LineChartGradientComponent') },
    { path: 'line-chart-brushed', element: import('./line-chart-brushed/LineChartBrushedComponent') },
    { path: 'line-chart-multiple-inputs', element: import('./line-chart-multiple-input/LineChartMultipleInput') },
    { path: 'multiple-charts', element: import('./multiple-charts/MultipleChartsComponent') },
    { path: '*', element: import('../../404Component') },
]

export const LineChartsRoutes = () => {
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
