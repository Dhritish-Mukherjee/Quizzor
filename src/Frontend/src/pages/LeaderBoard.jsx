import React from 'react'
import { MdOutlineLeaderboard } from "react-icons/md";
import { LuMoveUpRight } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

const LeaderBoard = () => {

  const navigate = useNavigate();

  const diffLeaderTable = [
       {
         title : "See Global Leaderboard",
         logo: '🌐',
        desc : "See where you position globally among other quiz wizerds",
        navigate : "/dashboard/leaderboard/global"
       },
       {
         title : "Your Rank for a specific Quiz",
         logo:'💀',
        desc : "See what your rank for a specific quiz",
        navigate : "/dashboard/leaderboard/specific-rank"
       },
       {
         title : "Get Specific Quiz Leaderboard",
         logo: '💹',
        desc : "See the leaderboard for a specific quiz",
        navigate : "/dashboard/leaderboard/specific-leaderbaord"
       },

    ]

    const navigatePage = (path) => {
      navigate(path);
    }
 
  return (
    <div className='p-0 flex flex-col gap-8 '>
      <h2 className=' text-xl sm:text-2xl  flex items-center justify-center gap-2 text-neutral-100 px-5 py-2 rounded-full  bg-yellow-800 border-2 border-yellow-500 font-mono text-center'>👑Leaderboard👑 </h2>

      <div className="leaderboard-table flex flex-col gap-4 sm:flex sm:flex-row  sm:gap-5 ">
        {diffLeaderTable.map((item, index) => (
          <div onClick={() => navigatePage(item.navigate)} key={index} className="item p-2 sm:p-3 bg-blue-500/20 border-2 border-blue-500 rounded-xl flex flex-col gap-1 shadow-md shadow-blue-500 cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300 ">
            <p className="p-2 bg-blue-500/20 w-fit rounded-lg border border-blue-500 ">{item.logo}</p>
            <h3 className='text-lg '>{item.title}</h3>
            <p className='text-sm text-zinc-400'>{item.desc}</p>
            <p className='text-sm flex justify-center items-center w-fit  gap-1 bg-white text-blue-500 px-3 py-1 rounded-full font-semibold '>go to check <LuMoveUpRight className='text-black font-bold' /> </p>
          </div>
        ))}
          
      </div>
    </div>
  )
}

export default LeaderBoard
