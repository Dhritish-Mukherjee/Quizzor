import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { AppConetxt } from "../context/AppContext";

const Navbar = () => {

  const { user, setShowLogin } = useContext(AppConetxt);


  return (
    <div>
      <nav className="flex justify-between py-3 px-5 sm:px-10 border-b border-gray-600 ">
        <Link to='/' ><div className="logo border border-gray-600 px-3  py-0.5 sm:px-5 sm:py-1 rounded-full flex justify-center items-center ">
            <h1 className="text-white text-lg sm:text-xl">Quizzor<span className="text-blue-500 text-2xl ">.</span>ai</h1>
        </div>
        </Link>

        <div className="right-menu flex items-center justify-center gap-3 ">
          {user ? 
            <Link to='/dashboard'><button className="px-5 py-1 bg-transparent rounded-full border border-neutral-100 hover:text-neutral-300  transition-all duration-300 text-neutral-100 cursor-pointer flex justify-center items-center gap-1 text-sm sm:text-md font-medium">Go to Dashboard <IoIosArrowRoundForward /></button></Link> :   

            <Link><button onClick={() => setShowLogin(true)} className="px-5 py-1 bg-blue-600 rounded-full text-neutral-100 hover:scale-105 hover:bg-blue-500 transition-all duration-300 cursor-pointer">Sign in</button></Link>
        }
            

            
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
