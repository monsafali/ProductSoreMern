import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import ProductsPage from "./pages/ProductsPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Signup from "./pages/Signup";
import { getMe } from "./store/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);


  return (
    <>
      {/* This is just a navbar */}
      <Navbar />
      <Box minH="100vh" bg={useColorModeValue("gray.300", "gray.900")}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/products" replace /> : <Login />
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/products" replace /> : <Signup />
            }
          />
          <Route
            path="/products"
            element={
              isAuthenticated ? <ProductsPage /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/create"
            element={
              isAuthenticated ? <CreatePage /> : <Navigate to="/" replace />
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
