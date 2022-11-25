import React from "react";
import ThemeWrapper from "./Components/Themes/Wrapper";
import AppLayout from "./Components/Layouts/AppLayout";
import { useRoutes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { BCRoutes } from "./Components/Graphs/bar-charts/BC-base";
import { PCRoutes } from "./Components/Graphs/pie-charts/PC-base";

const AppRoutes = () => {
  const routesElements = useRoutes([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: 'bc/*',     //Decendant Routes: https://www.robinwieruch.de/react-router-descendant-routes/
          element: <BCRoutes />
        },
        {
          path: 'pc/*',
          element: <PCRoutes />
        }
      ]
    }
  ]);
  return routesElements;
}

const App = () => {
  return (
    <Router>
      <ThemeWrapper>
        <AppRoutes />
      </ThemeWrapper>
    </Router>
  );
}

export default App;
