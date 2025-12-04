import React, { useContext } from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { AppConetxt } from '../../context/AppContext'
import { Link, useNavigate } from 'react-router-dom';
import { delay, motion } from "framer-motion"
import '../Button/GradientButton.css'


const Hero = () => {

    const {user, setShowLogin} = useContext(AppConetxt);
    const navigate = useNavigate();



    const onClickHandler = () => {
        if(user) {
          navigate('/dashboard');
        }else {
          setShowLogin(true);
        }
    }


  return (
    <motion.div className='flex flex-col gap-3 sm:gap-7 justify-center items-center  mt-16 sm:mt-20 '
    initial={{ opacity: 0.2, y:80 }}
    transition={{ duration:1 }}
    whileInView={ { opacity: 1, y: 0 }}
    
    >
      <motion.p 
       initial={{ opacity: 0.2, y:-20 }}
        animate={ { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      className='hookline text-xs sm:text-lg text-gray-400'>“Smart quizzes for smart learners.✨” </motion.p>

      <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 2 }}

      className='text-[12vw] sm:text-[6vw] text-center' >Skip the <span className='text-blue-500'>Manual Quiz Creation</span></motion.h1>
      <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className=' text-lg w-[70%] text-center sm:text-[2.2vw]'>Create smart quizzes in seconds — powered by Quizzor , just enter a topic and get high-quality questions instantly.</motion.p>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      
      className="taglines flex flex-col sm:flex sm:flex-row py-3 justify-center items-center gap-3">
        <div className='tagline text-white border border-gray-600 px-2 py-0.5  sm:px-3 sm:py-1 rounded-full  text-xs sm:text-sm'>🚀 Make learning faster.</div>
        <div className='tagline text-white border  border-gray-600 px-2 py-0.5  sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm'>🔹 Make teaching easier.</div>
        <div className='tagline text-white border  border-gray-600 px-2 py-0.5  sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm'>📲 Make revision smarter.</div>
      </motion.div>

      {user ? 
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="explore-buttons flex flex-col  gap-4 sm:flex sm:flex-row justify-center items-center sm:gap-3">

        <button className="px-8 py-2 bg-blue-600 rounded-full text-neutral-100 hover:scale-105 hover:bg-blue-500 transition-all duration-300 cursor-pointer quiz-now btn-blue-style">Start quiz now</button>

        <Link><button onClick={onClickHandler} className="px-8 py-2 bg-transparent rounded-full border border-neutral-100 hover:text-neutral-300  transition-all duration-300 text-neutral-100 cursor-pointer flex justify-center items-center gap-1 text-sm sm:text-md font-medium">Go to dashboard<IoIosArrowRoundForward /></button></Link>
      </motion.div> : 

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      className="explore-buttons flex flex-col  sm:flex sm:flex-row justify-center items-center gap-3">

        <button className="px-8 py-2 bg-blue-600 rounded-full text-neutral-100 hover:scale-105 hover:bg-blue-500 transition-all duration-300 cursor-pointer btn-blue-style">Start quiz now</button>

        <Link><button onClick={onClickHandler} className="px-8 py-2 bg-transparent rounded-full border border-neutral-100 hover:text-neutral-300  transition-all duration-300 text-neutral-100 cursor-pointer flex justify-center items-center gap-1 text-sm sm:text-md font-medium">Sign in <IoIosArrowRoundForward /></button></Link>
      </motion.div>
    }

    <div className='quiz-now w-[100px] h-[100px] sm:w-[300px] sm:h-[300px] bg-linear-to-br from-[#008cff] to-blue-500 blur-3xl opacity-30 absolute top-1/4 right-1/7 sm:top-1/4  sm:right-1/7 z-0 '></div>

    
    </motion.div>

    
  )
}

export default Hero
