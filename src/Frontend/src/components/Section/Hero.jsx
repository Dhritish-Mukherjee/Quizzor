import React, { useContext } from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { AppConetxt } from '../../context/AppContext'
import { Link } from 'react-router-dom';


const Hero = () => {

    const {user} = useContext(AppConetxt);


  return (
    <div className='flex flex-col gap-3 sm:gap-7 justify-center items-center  mt-16 sm:mt-20 '>
      <p className='hookline text-xs sm:text-lg text-gray-400'>“Smart quizzes for smart learners.✨” </p>

      <h1 className='text-[12vw] sm:text-[6vw] text-center' >Skip the <span className='text-blue-500'>Manual Quiz Creation</span></h1>
      <p className=' text-lg w-[70%] text-center sm:text-[2.2vw]'>Create smart quizzes in seconds — powered by Quizzor , just enter a topic and get high-quality questions instantly.</p>
      <div className="taglines flex flex-col sm:flex sm:flex-row py-3 justify-center items-center gap-3">
        <div className='tagline text-white border border-gray-600 px-2 py-0.5  sm:px-3 sm:py-1 rounded-full  text-xs sm:text-sm'>🚀 Make learning faster.</div>
        <div className='tagline text-white border  border-gray-600 px-2 py-0.5  sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm'>🔹 Make teaching easier.</div>
        <div className='tagline text-white border  border-gray-600 px-2 py-0.5  sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm'>📲 Make revision smarter.</div>
      </div>

      {user ? 
        <div className="explore-buttons flex flex-col  gap-4 sm:flex sm:flex-row justify-center items-center sm:gap-3">

        <button className="px-8 py-2 bg-blue-600 rounded-full text-neutral-100 hover:scale-105 hover:bg-blue-500 transition-all duration-300 cursor-pointer quiz-now">Start quiz now</button>

        <Link to='/dashboard'><button className="px-8 py-2 bg-transparent rounded-full border border-neutral-100 hover:text-neutral-300  transition-all duration-300 text-neutral-100 cursor-pointer flex justify-center items-center gap-1 text-sm sm:text-md font-medium">Go to dashboard<IoIosArrowRoundForward /></button></Link>
      </div> : 

      <div className="explore-buttons sm:flex justify-center items-center gap-3">

        <button className="px-8 py-2 bg-blue-600 rounded-full text-neutral-100 hover:scale-105 hover:bg-blue-500 transition-all duration-300 cursor-pointer">Start quiz now</button>

        <Link to='/login'><button className="px-8 py-2 bg-transparent rounded-full border border-neutral-100 hover:text-neutral-300  transition-all duration-300 text-neutral-100 cursor-pointer flex justify-center items-center gap-1 text-sm sm:text-md font-medium">Sign in <IoIosArrowRoundForward /></button></Link>
      </div>
    }

    <div className='quiz-now w-[100px] h-[100px] sm:w-[300px] sm:h-[300px] bg-linear-to-br from-[#008cff] to-blue-500 blur-3xl opacity-30 absolute top-1/4 right-1/7 sm:top-1/4  sm:right-1/7 z-0 '></div>

    
    </div>

    
  )
}

export default Hero
