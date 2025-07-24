import React from "react";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./routes/AnimatedRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default App;
