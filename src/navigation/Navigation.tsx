import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { paths } from "./Routes";
import Layout from "./Layout";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          {paths.map((el) => {
            return (
              <Route
                element={<el.component />}
                index={el.index}
                path={el.path}
                key={el.path}
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
