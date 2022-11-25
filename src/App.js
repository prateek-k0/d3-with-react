import React from "react";
import Sidebar from './Components/Sidebar/Sidebar'
import AppBarHeader from "./Components/AppBar";
import ThemeWrapper from "./Components/Themes/Wrapper";

const App = () => {
  return (
    <ThemeWrapper>
      <div className="App">
        <AppBarHeader />
        <Sidebar />
      </div>
    </ThemeWrapper>
  );
}

export default App;
