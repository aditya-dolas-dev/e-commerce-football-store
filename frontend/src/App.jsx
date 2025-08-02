import React from "react";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./routes/AnimatedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
// In App.js or index.js
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/600.css"; // Optional: weight 600

const App = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </BrowserRouter>
  );
};

export default App;
