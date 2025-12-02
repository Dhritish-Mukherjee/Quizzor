import React from "react";
import Quizzor_logo from "./assets/Quizzor_logo.png";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div className="w-full h-screen p-0 m-0 ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
