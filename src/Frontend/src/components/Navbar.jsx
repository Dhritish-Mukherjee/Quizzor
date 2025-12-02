import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between py-4 ">
        <Link to='/' ><div className="logo border border-gray-600 px-5 py-1.5  rounded-full">
            <h1 className="text-white text-xl">Quizzor.<span className="text-blue-500 text-lg ">ai</span></h1>
        </div>
        </Link>

        <div className="right-menu flex items-center justify-center gap-3 ">
            <button className="px-5 py-1.5 bg-blue-500 rounded-full text-neutral-100 hover:scale-105 transition-all duration-300 cursor-pointer">Login</button>

            <button className="px-4 py-1.5 bg-transparent rounded-full border border-gray-600 hover:bg-blue-500 hover:border-blue-500 hover:scale-105 transition-all duration-300 text-neutral-100 cursor-pointer">Go to Dashboard</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
