import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/admin/Main";
import Index from "../pages/client/Index";

const MainAr = () => {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/dashboard"
          element={
            <>
              <Main />
            </>
          }
        ></Route>
        <Route
          exact
          path="/"
          element={
            <>
              <Index />
            </>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default MainAr;
