import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loading from "../features/LoadingAnimation";
import { AnimatePresence } from "framer-motion";

import { Suspense, lazy } from "react";
import Retro from "../pages/Retro";
import SeasonArrivals from "../pages/SeasonArrivals";
import Iconics from "../pages/Iconics";
import ProductPage from "../pages/ProductPage";

const AdminLogin = lazy(() => import("../pages/AdminLogin"));
const AdminSignup = lazy(() => import("../pages/AdminSignup"));
const Signup = lazy(() => import("../pages/Signup"));
const Shop = lazy(() => import("../pages/Shop"));
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
        <Route
          path="/shop"
          element={
            <Suspense fallback={<Loading />}>
              <Shop />
            </Suspense>
          }
        />
        <Route
          path="/adminlogin"
          element={
            <Suspense fallback={<Loading />}>
              <AdminLogin />
            </Suspense>
          }
        />{" "}
        <Route
          path="/adminsignup"
          element={
            <Suspense fallback={<Loading />}>
              <AdminSignup />
            </Suspense>
          }
        />
        <Route
          path="/shop/iconics"
          element={
            <Suspense fallback={<Loading />}>
              <Iconics />
            </Suspense>
          }
        />
        <Route
          path="/shop/season-arrivals"
          element={
            <Suspense fallback={<Loading />}>
              <SeasonArrivals />
            </Suspense>
          }
        />
        <Route
          path="/shop/retro"
          element={
            <Suspense fallback={<Loading />}>
              <Retro />
            </Suspense>
          }
        />
        <Route
          path="/shop/product/:id"
          element={
            <Suspense fallback={<Loading />}>
              <ProductPage />
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
