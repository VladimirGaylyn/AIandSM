import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ClimateReport from "./pages/ClimateReports";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/climate-report" element={<ClimateReport />} />
      </Routes>
    </BrowserRouter>
  );
}
