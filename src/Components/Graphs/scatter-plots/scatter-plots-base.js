import { useLocation, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import LoadingComp from "../../Common/LoadingComponent/LoadingComponent";

const routes = [
    { path: 'scatter-plot-brush', element: import('./scatter-plot-with-brush/ScatterPlotBrushComponent') },
    { path: 'scatter-plot-brush-zoom', element: import('./scatter-plot-brush-zoom/ScatterPlotBrushZoomComponent') },
    { path: 'scatter-plot-group', element: import('./scatter-plot-grouped/ScatterPlotGrouped') },
    { path: 'scatter-plot-basic', element: import('./scatter-plot-basic/ScatterPlotBasicComponent') },
    { path: '*', element: import('../../404Component') },
]

export const ScatterChartsRoutes = () => {
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