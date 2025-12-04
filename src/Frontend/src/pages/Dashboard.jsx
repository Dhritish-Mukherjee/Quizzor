import React, { useState } from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";

const Dashboard = () => {

  const [menu, setMenu] = useState("");

  return (
    <div className="w-full h-auto ">

      <div className="uppe-navbar">
        <nav className="flex justify-between py-3 px-5 sm:px-10 border-b border-gray-600 ">
          <Link to="/">
            <div className="logo border border-gray-600 px-3  py-0.5 sm:px-5 sm:py-1 rounded-full flex justify-center items-center ">
              <h1 className="text-white text-lg sm:text-xl">
                Quizzor<span className="text-blue-500 text-2xl ">.</span>ai
              </h1>
            </div>
          </Link>
        </nav>
      </div>

      <div className="lower-part flex gap-5 ">
        <div className="sidebar w-1/6 min-h-screen h-auto bg-transparent border-r border-gray-600 p-5 hidden sm:flex flex-col gap-3 ">
            <Link to='/dashboard/profile' ><li onClick={() => setMenu("profile")} className={`list-none px-5 py-2 bg-zinc-800 text-zinc-400 rounded-lg ${menu === 'profile' ? 'border-l-2 border-blue-500' : ''} `}>Profile</li></Link>
            <Link to='/dashboard/admin'><li onClick={() => setMenu("admin")} className={`list-none px-5 py-2 bg-zinc-800 text-zinc-400 rounded-lg ${menu === 'admin' ? 'border-l-2 border-blue-500' : ''}`}>Admin</li></Link>
            <Link to='/dashboard/quiz'><li onClick={() => setMenu("quiz")} className={`list-none px-5 py-2 bg-zinc-800 text-zinc-400 rounded-lg ${menu === 'quiz' ? 'border-l-2 border-blue-500' : ''}`}>Quiz</li></Link>
            <Link to='/dashboard/analytics'><li onClick={() => setMenu("analytics")} className={`list-none px-5 py-2 bg-zinc-800 text-zinc-400 rounded-lg ${menu === 'analytics' ? 'border-l-2 border-blue-500' : ''}`}>Analytics</li></Link>
            <Link to='/dashboard/leaderboard'><li onClick={() => setMenu("leaderboard")} className={`list-none px-5 py-2 bg-zinc-800 text-zinc-400 rounded-lg ${menu === 'leaderboard' ? 'border-l-2 border-blue-500' : ''} `}>Leaderboard</li></Link>
        </div>

        <div className="main-content w-full p-5 border border-gray-600 m-2 rounded-lg relative z-2">
          <Outlet /> 
          <h3 className="absolute top-1/2 left-1/2 transform -translate-x-[50%]  -translate-y-[50%] -z-1 text-[5vw] tracking-wider text-zinc-800">Quizzor.</h3>   
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
