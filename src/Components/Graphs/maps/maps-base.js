import { useLocation, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import LoadingComp from "../../Common/LoadingComponent/LoadingComponent";

const routes = [
    { path: '*', element: import('../../404Component') },
    { path: 'basic', element: import('./map-basic/MapBasicComponent') },
    { path: 'choropleth', element: import('./choropleth-map/ChoroplethMapComponent') },
    { path: 'country-map-india', element: import('./Country Map - India/CountryMapComponent') },
]

export const MapsRoutes = () => {
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