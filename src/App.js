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

const AppRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path='/' element={<AppLayout />}>  {/* Base path - render layout */}
        <Route index={true} element={<HomepageComponent />} /> {/* index path - render homepage */}
        <Route path='bar-charts/*' element={<BarChartsRoutes />} />   {/* //Descendant Routes: https://www.robinwieruch.de/react-router-descendant-routes/ */}
        <Route path='pie-charts/*' element={<PieChartsRoutes />} />
        <Route path='area-charts/*' element={<AreaChartsRoutes />} />
        <Route path='bubble-charts/*' element={<BubbleChartsRoutes />} />
        <Route path='scatter-plots/*' element={<ScatterChartsRoutes />} />
        <Route path='arc-diagrams/*' element={<ArcChartsRoutes />} />
        <Route path='line-charts/*' element={<LineChartsRoutes />} />
        <Route path='histograms/*' element={<HistogramsRoutes />} />
        <Route path='heatmaps/*' element={<HeatmapsRoutes />} />
        <Route path='treemaps/*' element={<TreemapsRoutes />} />
        <Route path='maps/*' element={<MapsRoutes />} />
        <Route path='*' element={<Default404Component />} />
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
