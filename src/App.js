import React from "react";
import ThemeWrapper from "./Components/Themes/Wrapper";
import AppLayout from "./Components/Layouts/AppLayout";
import { useLocation, Routes, Route } from "react-router-dom";

import { BarChartsRoutes } from "./Components/Graphs/bar-charts/Bar-charts-base";
import { PieChartsRoutes } from "./Components/Graphs/pie-charts/Pie-charts-base";
import { AreaChartsRoutes } from "./Components/Graphs/area-charts/Area-charts-base";
import { BubbleChartsRoutes } from "./Components/Graphs/bubble-charts/bubble-charts-base";
import { ScatterChartsRoutes } from "./Components/Graphs/scatter-plots/scatter-plots-base";
import { ArcChartsRoutes } from "./Components/Graphs/arc-charts/arc-charts-base";
import { LineChartsRoutes } from "./Components/Graphs/line-charts/line-charts-base";
import { HistogramsRoutes } from "./Components/Graphs/histograms/histograms-base";
import { HeatmapsRoutes } from "./Components/Graphs/heatmaps/heatmaps-base";
import { MapsRoutes } from "./Components/Graphs/maps/maps-base";
import { TreemapsRoutes } from "./Components/Graphs/treemaps/treemaps-base";
import HomepageComponent from "./Components/Home";
import Default404Component from "./Components/404Component";

const routes = [
  { index: true, element: <HomepageComponent />, },
  { path: 'bar-charts/*', element: <BarChartsRoutes /> }, //Decendant Routes: https://www.robinwieruch.de/react-router-descendant-routes/
  { path: 'pie-charts/*', element: <PieChartsRoutes /> },
  { path: 'area-charts/*', element: <AreaChartsRoutes /> },
  { path: 'bubble-charts/*', element: <BubbleChartsRoutes /> },
  { path: 'scatter-plots/*', element: <ScatterChartsRoutes /> },
  { path: 'arc-diagrams/*', element: <ArcChartsRoutes /> },
  { path: 'line-charts/*', element: <LineChartsRoutes /> },
  { path: 'histograms/*', element: <HistogramsRoutes /> },
  { path: 'heatmaps/*', element: <HeatmapsRoutes /> },
  { path: 'treemaps/*', element: <TreemapsRoutes /> },
  { path: 'maps/*', element: <MapsRoutes /> },
  { path: '*', element: <Default404Component /> },
]

const AppRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.key}>
        <Route path={'/'} element={<AppLayout />} key='/'>
        {routes.map((route) => (
            <Route path={route?.path ?? undefined} element={route.element} key={route.path ?? 'index-route'} index={route?.index ?? false} />
        ))}
        </Route>
    </Routes>
  )
}

const App = () => {
  return (
    <ThemeWrapper>
        <AppRoutes />
    </ThemeWrapper>
  );
}

export default App;
