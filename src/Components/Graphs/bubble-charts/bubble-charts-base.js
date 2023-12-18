import { useLocation, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import LoadingComp from "../../Common/LoadingComponent/LoadingComponent";

const routes = [
    { path: 'circular-packing-basic', element: import('./BasicCircularPacking/BasicCircularPackingComponent') },
    { path: 'bubble-force-simulation', element: import('./BubbleForceSimulation/BubbleForceSimulationComponent') },
    { path: 'circular-pack-zoom', element: import('./ZoomableCircularPacking/ZoomableCircularPackingComponent') },
    { path: 'bubble-scatter-plot', element: import('./BubbleChartScatter/BubbleChartScatterComponent') },
    { path: '*', element: import('../../404Component') },
]

export const BubbleChartsRoutes = () => {
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
    )
}