import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { MdQuiz } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { MdLeaderboard } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { AppConetxt } from "../context/AppContext";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Dashboard = () => {

  const [menu, setMenu] = useState("");
  const { logout, showMenu, setShowMenu, dashMenuHandler } = useContext(AppConetxt);


  return (
    <div className="w-full h-auto ">

      <div className="uppe-navbar ">
        <nav className="flex justify-between py-3 px-5 sm:px-10 border-b border-gray-600 ">
          <Link to="/">
            <div className="logo border border-gray-600 px-3  py-0.5 sm:px-5 sm:py-1 rounded-full flex justify-center items-center ">
              <h1 className="text-white text-lg sm:text-xl">
                Quizzor<span className="text-blue-500 text-2xl ">.</span>ai
              </h1>
            </div>
          </Link>

          <div className="right-btns flex justify-center items-center gap-2.5 ">
            <p  onClick={logout} className="flex items-center justify-center gap-2 text-neutral-400 px-4 py-1 bg-zinc-800 rounded-full cursor-pointer hover:scale-103 transition-all duration-300"><AiOutlineLogout className=" text-zinc-500" />Logout</p>
            
            <HiOutlineMenuAlt3 onClick={dashMenuHandler} size={25}  className="sm:hidden" />
          </div>


        </nav>
      </div>

      <div className="lower-part flex gap-5 ">
        <div className="sidebar w-1/5 min-h-screen h-auto bg-transparent border-r border-gray-600 hidden sm:flex flex-col gap-3">
            <h3 className="text-xl text-center text-blue-500 border-b border-zinc-500 py-3">Dashboard</h3>
            <div className="links flex flex-col gap-3 px-3">
              <Link to='/dashboard/profile' ><li onClick={() => setMenu("profile")} className={`list-none px-5 py-2  text-zinc-400 rounded-lg ${menu === 'profile' ? 'border-l-2 border-blue-500 bg-zinc-800' : ''} flex gap-3 items-center hover:bg-zinc-800`}><FaRegUserCircle /> Profile</li></Link>

            <Link to='/dashboard/admin'><li onClick={() => setMenu("admin")} className={`list-none px-5 py-2  text-zinc-400 rounded-lg ${menu === 'admin' ? 'border-l-2 border-blue-500 bg-zinc-800' : ''} flex gap-3 items-center hover:bg-zinc-800`}><GrUserAdmin /> Admin</li></Link>

            <Link to='/dashboard/quiz'><li onClick={() => setMenu("quiz")} className={`list-none px-5 py-2  text-zinc-400 rounded-lg ${menu === 'quiz' ? 'border-l-2 border-blue-500 bg-zinc-800' : ''} flex gap-3 items-center hover:bg-zinc-800`}><MdQuiz /> Quiz</li></Link>

            <Link to='/dashboard/analytics'><li onClick={() => setMenu("analytics")} className={`list-none px-5 py-2  text-zinc-400 rounded-lg ${menu === 'analytics' ? 'border-l-2 border-blue-500  bg-zinc-800' : ''} flex gap-3 items-center hover:bg-zinc-800`}><IoMdAnalytics /> Analytics</li></Link>

            <Link to='/dashboard/leaderboard'><li onClick={() => setMenu("leaderboard")} className={`list-none px-5 py-2 text-zinc-400 rounded-lg ${menu === 'leaderboard' ? 'border-l-2 border-blue-500  bg-zinc-800' : ''} flex gap-3 items-center hover:bg-zinc-800`}><MdLeaderboard /> Leaderboard</li></Link>

            </div>
        </div>

        <div className="main-content w-full px-3 py-5 sm:p-5  m-2 rounded-lg relative z-2">
          <Outlet /> 
          <h3 className="absolute top-1/2 left-1/2 transform -translate-x-[50%]  -translate-y-[50%] -z-1 text-[5vw] tracking-wider text-zinc-800">Quizzor.</h3>   
        </div>
      </div>



    </div>
  );
};

export default Dashboard;
