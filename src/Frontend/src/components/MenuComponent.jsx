import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';
import { IoMdAnalytics } from 'react-icons/io';
import { MdLeaderboard, MdQuiz } from 'react-icons/md';
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"
import { AppConetxt } from '../context/AppContext';

const MenuComponent = () => {

    const [menu, setMenu] = useState("");
    const {showMenu, setShowMenu} = useContext(AppConetxt);


  return (
    <AnimatePresence>
        {showMenu && 
    <motion.div 
    initial={{ opacity:0, x:100 }}
    animate={{ opacity:1, x:0 }}
    exit={{ opacity: 0, x: 100,transition: { duration: 0.5 } }}
    transition={{duration: 0.3,}}

    className="links flex flex-col gap-3 px-3 absolute bg-zinc-900 w-[50%] p-5 right-0 top-[9.5%] min-h-screen h-auto sm:hidden z-100 border-l border-zinc-500 ">
              <Link to='/dashboard/profile' ><li onClick={() => setMenu("profile")} className={`list-none px-5 py-2  text-zinc-400 rounded-lg ${menu === 'profile' ? 'border-l-2 border-blue-500 bg-zinc-800' : ''} flex gap-3 items-center hover:bg-zinc-800`}><FaRegUserCircle /> Profile</li></Link>

            {/* <Link to='/dashboard/admin'><li onClick={() => setMenu("admin")} className={`list-none px-5 py-2  text-zinc-400 rounded-lg ${menu === 'admin' ? 'border-l-2 border-blue-500 bg-zinc-800' : ''} flex gap-3 items-center hover:bg-zinc-800`}><GrUserAdmin /> Admin</li></Link> */}

            <Link to='/dashboard/quiz'><li onClick={() => setMenu("quiz")} className={`list-none px-5 py-2  text-zinc-400 rounded-lg ${menu === 'quiz' ? 'border-l-2 border-blue-500 bg-zinc-800' : ''} flex gap-3 items-center hover:bg-zinc-800`}><MdQuiz /> Quiz</li></Link>

            <Link to='/dashboard/analytics'><li onClick={() => setMenu("analytics")} className={`list-none px-5 py-2  text-zinc-400 rounded-lg ${menu === 'analytics' ? 'border-l-2 border-blue-500  bg-zinc-800' : ''} flex gap-3 items-center hover:bg-zinc-800`}><IoMdAnalytics /> Analytics</li></Link>

            <Link to='/dashboard/leaderboard'><li onClick={() => setMenu("leaderboard")} className={`list-none px-5 py-2 text-zinc-400 rounded-lg ${menu === 'leaderboard' ? 'border-l-2 border-blue-500  bg-zinc-800' : ''} flex gap-3 items-center hover:bg-zinc-800`}><MdLeaderboard /> Leaderboard</li></Link>

            </motion.div> }
            </AnimatePresence>
  )
}

export default MenuComponent
