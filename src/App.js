import React from "react";
import ThemeWrapper from "./Components/Themes/Wrapper";
import AppLayout from "./Components/Layouts/AppLayout";
import { useRoutes } from "react-router-dom";

import { BarChartsRoutes } from "./Components/Graphs/bar-charts/Bar-charts-base";
import { PieChartsRoutes } from "./Components/Graphs/pie-charts/Pie-charts-base";
import { AreaChartsRoutes } from "./Components/Graphs/area-charts/Area-charts-base";
import { BubbleChartsRoutes } from "./Components/Graphs/bubble-charts/bubble-charts-base";
import { ScatterChartsRoutes } from "./Components/Graphs/scatter-plots/scatter-plots-base";
import { ArcChartsRoutes } from "./Components/Graphs/arc-charts/arc-charts-base";
import { LineChartsRoutes } from "./Components/Graphs/line-charts/line-charts-base";
import { HistogramsRoutes } from "./Components/Graphs/histograms/histograms-base";

const AppRoutes = () => {
  const routesElements = useRoutes([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: 'bar-charts/*',     //Decendant Routes: https://www.robinwieruch.de/react-router-descendant-routes/
          element: <BarChartsRoutes />
        },
        {
          path: 'pie-charts/*',
          element: <PieChartsRoutes />
        },
        {
          path: 'area-charts/*',
          element: <AreaChartsRoutes />
        },
        {
          path: 'bubble-charts/*',
          element: <BubbleChartsRoutes />
        },
        {
          path: 'scatter-plots/*',
          element: <ScatterChartsRoutes />
        },
        {
          path: 'arc-diagrams/*',
          element: <ArcChartsRoutes />
        },
        {
          path: 'line-charts/*',
          element: <LineChartsRoutes />
        },
        {
          path: 'histograms/*',
          element: <HistogramsRoutes />
        },
      ]
    }
  ]);
  return routesElements;
}

const App = () => {
  return (
    <ThemeWrapper>
      <AppRoutes />
    </ThemeWrapper>
  );
}

export default App;
