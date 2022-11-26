import React from "react";
import ThemeWrapper from "./Components/Themes/Wrapper";
import AppLayout from "./Components/Layouts/AppLayout";
import { useRoutes } from "react-router-dom";

import { BarChartsRoutes } from "./Components/Graphs/bar-charts/Bar-charts-base";
import { PieChartsRoutes } from "./Components/Graphs/pie-charts/Pie-charts-base";

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
        }
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
