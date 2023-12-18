import { Route, Routes, useLocation } from "react-router-dom";
import React, { Suspense } from "react";
import LoadingComp from "../../Common/LoadingComponent/LoadingComponent";

const routes = [
    { path: 'arc-diagram-mouse', element: import('./arc-diagram-with-mouse-events/ArcDiagramMouseEventsComponent') },
    { path: 'arc-diagram-basic', element: import('./arc-diagram-basic/ArcDiagramBasicComponent') },
    { path: 'arc-diagram-vertical', element: import('./arc-diagram-vertical/ArcDiagramVerticalComponent') },
    { path: '*', element: import('../../404Component') },
]

export const ArcChartsRoutes = () => {
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