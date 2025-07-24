import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loading from "../features/LoadingAnimation";
import { AnimatePresence } from "framer-motion";

import { Suspense, lazy } from "react";

const Signup = lazy(() => import("../pages/Signup"));

const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<Loading />}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
