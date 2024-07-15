import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/admin/Main";
import Index from "../pages/client/Index";
import PaySuccess from "../pages/client/PaySuccess";

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
        <Route
          exact
          path="/paymentsuccess"
          element={
            <>
              <PaySuccess />
            </>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default MainAr;
