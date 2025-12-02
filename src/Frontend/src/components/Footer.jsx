import React from 'react'
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='flex flex-col py-12 px-20 w-full h-auto max-h-screen text-white pb-5 '>
      <div className=' flex justify-between items-center'>
       <div className="newsletter flex flex-col items-start gap-5 w-1/2 ">
            <h3 className='text-3xl font-light'>Subscribe to newsletter</h3>
            <div className="email flex justify-center items-center gap-5">
              <input type="email" placeholder='your@email.com' className='outline-none border-b border-gray-500 text-xl focus:border-blue-500 py-2 placeholder:text-xl placeholder:font-light' />
              <IoArrowForwardCircleOutline   size={30} className='font-medium text-gray-500'/>
            </div>
       </div>
       <div className="socials flex justify-between items-center gap-30 ">
        <div className="first flex flex-col gap-3  border-l border-gray-600 px-5">
            <li className='list-none text-gray-400 cursor-pointer hover:underline hover:text-blue-500'>Products</li>
            <li className='list-none text-gray-400 cursor-pointer hover:underline hover:text-blue-500'>Solutions</li>
            <li className='list-none text-gray-400 cursor-pointer hover:underline hover:text-blue-500'>Research</li>
            <li className='list-none text-gray-400 cursor-pointer hover:underline hover:text-blue-500'>Blog</li>
            <li className='list-none text-gray-400 cursor-pointer hover:underline hover:text-blue-500'>About</li>
            <li className='list-none text-gray-400 cursor-pointer hover:underline hover:text-blue-500'>Privacy policy</li>
            <li className='list-none text-gray-400 cursor-pointer hover:underline hover:text-blue-500'>Terms of service</li>
        </div>
       </div>
    </div>

    <div className="end-footer flex justify-between items-center py-5">
      <Link to='/' ><div className="logo  px-3 py-0.5 sm:px-5 sm:py-1 rounded-full flex justify-center items-center ">
            <h1 className="text-white text-lg sm:text-xl">Quizzor<span className="text-blue-500 text-2xl ">.</span>ai</h1>
        </div>
      </Link>
      
      <div className="socials flex items-center justify-center gap-5 ">
              <div className="logo cursor-pointer text-gray-400 hover:text-blue-500 transition-all duration-300 "><FaDiscord/></div>
              <div className="logo cursor-pointer text-gray-400 hover:text-blue-500 transition-all duration-300"><BsTwitterX/></div>
              <div className="logo cursor-pointer text-gray-400 hover:text-blue-500 transition-all duration-300"><FaLinkedin/></div>
              <div className="logo cursor-pointer text-gray-400 hover:text-blue-500 transition-all duration-300"><RiInstagramFill/></div>
      </div>

      <div className="right text-sm text-gray-400">
        &copy; 2025 | all rights reserved | Kolkata, Ruby, India 
      </div>
    </div>

    </div>
  )
}

export default Footer
