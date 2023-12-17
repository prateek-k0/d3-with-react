import { useLocation, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import LoadingComp from "../../Common/LoadingComponent/LoadingComponent";

const routes = [
    { path: '*', element: import('../../404Component') },
    { path: 'basic', element: import('./treemap-basic/TreemapBasicComponent') },
]

const delayedPromise = (promise, delay = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(promise), delay);
    })
}

export const TreemapsRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.key}>
            {routes.map((route) => {
                const LazyElement = React.lazy(() => delayedPromise(route.element, 1000));
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