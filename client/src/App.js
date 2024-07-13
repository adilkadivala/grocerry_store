import React from "react";
import Pathes from "./routes/Pathes";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Pathes />
      </BrowserRouter>
    </>
  );
};

export default App;
