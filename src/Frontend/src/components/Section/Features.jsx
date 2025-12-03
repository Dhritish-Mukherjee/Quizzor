import React, { useContext } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { AppConetxt } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const Features = () => {

    const {user} = useContext(AppConetxt)

    const cardFeatures = [
        {
            feature : 'AI-Generated MCQs'
        },
        {
            feature : 'One-click quiz creation'
        },
        {
            feature : 'Custom quiz length'
        },
        {
            feature : 'Difficulty selection'
        },
        {
            feature : 'Beautiful quiz UI'
        },
        {
            feature : 'Instant share & download'
        },
        {
            feature : 'History of all quizzes'
        },
        {
            feature : 'Clean and fast interface'
        },

    ]

    
  return (
    <div className='w-full min-h-screen h-auto flex flex-col items-center bg-neutral-100 text-zinc-800 py-8 sm:py-20 px-8 sm:px-20 gap-10'>
      <h1 className='text-3xl sm:text-6xl text-zinc-800 text-center w-full sm:w-[80%]'>Power-Packed <span className='text-blue-500'>Features</span> That Elevate Experience</h1>

      <div className="cards flex justify-center items-center gap-3 flex-wrap">
            {cardFeatures.map((item, index) => (
                <div key={index} className="card px-8 py-8 sm:px-10 sm:py-15  bg-white rounded-xl hover:scale-105 cursor-pointer transition-all duration-300 hover:shadow-lg shadow-md relative flex justify-center items-center">
                    <div className='dot w-2 h-2 rounded-full bg-blue-500 absolute top-2 left-2'></div>
                    <h3 className='text-zinc-800 text-lg sm:text-xl'>{item.feature}</h3>
                </div>
            ))}
        </div> 

        <div className='p-1 bg-gray-600 flex justify-center items-center gap-2 rounded-full hover:scale-105 transition '>
            <Link className='flex justify-center items-center gap-1 ' to={user ? '/dashboard' : '/login'}><button className='bg-gray-800 text-white px-5 py-1 sm:px-10 sm:py-2 rounded-full hover:text-neutral-300 cursor-pointer text-sm sm:text-lg '>{user ? 'Go to dashboard' : 'Sign in'}</button>
            <div className='flex justify-center items-center p-1 sm:p-2 bg-blue-500 rounded-full text-white '>
                <FaArrowRight/>
            </div>
            </Link>
        </div>
    </div>
  )
}

export default Features
