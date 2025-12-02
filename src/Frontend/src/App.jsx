import React from "react";
import Quizzor_logo from "./assets/Quizzor_logo.png";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import GradientButton from "./components/Button/GradientButton";

const App = () => {
  return (
    <div className="w-full min-h-screen  bg-zinc-900 text-white  ">
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
