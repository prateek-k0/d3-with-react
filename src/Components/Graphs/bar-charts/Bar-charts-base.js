import { useLocation, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import LoadingComp from "../../Common/LoadingComponent/LoadingComponent";

const routes = [
    { path: 'bar-chart-1', element: import('./bar-chart-1/Bar-Chart-1') },
    { path: 'stacked-bar-chart', element: import('./Stacked Bar Chart/StackedBarChartComponent') },
    { path: 'clustered-bar-chart', element: import('./clustered-bar-chart/ClusteredBarChartComponent') },
    { path: 'horizontal-bar-chart', element: import('./horizontal-bar-chart/HorizontalBarChartComponet') },
    { path: 'dotted-bar-chart', element: import('./dotted-bar-charts/DottedBarChartComponent') },
    { path: 'racing', element: import('./racing-bar-chart/RacingBarChartComponent') },
    { path: '*', element: import('../../404Component') },
]

export const BarChartsRoutes = () => {
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
