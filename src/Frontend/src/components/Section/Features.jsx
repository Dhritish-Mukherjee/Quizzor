import React, { useContext } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { AppConetxt } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Features = () => {

    const {user, setShowLogin} = useContext(AppConetxt);
    const navigate = useNavigate();

    const onClickHandler = () => {
        if(user) {
            toast.success("Moving to dashboard")
        }else {
            toast.error("you have to login first")
        }
    }

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
    <motion.div
    initial={{ opacity: 0.2, y:10 }}
    transition={{ duration:1 }}
    whileInView={ { opacity: 1, y: 0 }}

    className='w-full min-h-screen h-auto flex flex-col items-center bg-neutral-100 text-zinc-800 py-8 sm:py-20 px-8 sm:px-20 gap-10'>
      <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 2 }}

      className='text-3xl sm:text-6xl text-zinc-800 text-center w-full sm:w-[80%]'>Power-Packed <span className='text-blue-500'>Features</span> That Elevate Experience</motion.h1>

      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 2 }}

      className="cards flex justify-center items-center gap-3 flex-wrap">
            {cardFeatures.map((item, index) => (
                <motion.div 
                initial={{ opacity:0, x:-40 }}
                whileInView={{ x:0 , opacity: 1 }}
                transition={{duration: 0.8, delay: 1}}
                key={index} className="card px-8 py-8 sm:px-10 sm:py-15  bg-white rounded-xl hover:scale-105 cursor-pointer transition-all duration-300 hover:shadow-lg shadow-md relative flex justify-center items-center">
                    <div className='dot w-2 h-2 rounded-full bg-blue-500 absolute top-2 left-2'></div>
                    <h3 className='text-zinc-800 text-lg sm:text-xl'>{item.feature}</h3>
                </motion.div>
            ))}
        </motion.div> 

        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 3 }}

        className='p-1 bg-gray-600 flex justify-center items-center gap-2 rounded-full hover:scale-105 transition '>
            <Link className='flex justify-center items-center gap-1 ' onClick={onClickHandler} to={user && navigate('/dashboard')}><button className='bg-gray-800 text-white px-5 py-1 sm:px-10 sm:py-2 rounded-full hover:text-neutral-300 cursor-pointer text-sm sm:text-lg '>Go to dashboard</button>
            <div className='flex justify-center items-center p-1 sm:p-2 bg-blue-500 rounded-full text-white '>
                <FaArrowRight/>
            </div>
            </Link>
        </motion.div>
    </motion.div>
  )
}

export default Features
