import { useLocation, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import LoadingComp from "../../Common/LoadingComponent/LoadingComponent";

const routes = [
    { path: 'pie-chart-labels', element: import('./pie-chart-labels/PieChartWithLabelsComponent') },
    { path: 'pie-chart-perc-distribution', element: import('./pie-chart-percentage-distribution/PieChartComponent') },
    { path: 'donut-chart', element: import('./donut-chart/DonutChartComponent') },
    { path: 'sunburst-chart', element: import('./sunburst-chart/SunburstChartComponent') },
    { path: 'zoomable-sunburst', element: import('./chord-chart-colored/ChordChartColoredComponent') },
    { path: 'chord-colored', element: import('./chord-chart-colored/ChordChartColoredComponent') },
    { path: 'chord-labeled', element: import('./chord-chart-labeled/ChordChartLabeledComponent') },
    { path: '*', element: import('../../404Component') },
];

export const PieChartsRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.pathname}>
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
    );
}
