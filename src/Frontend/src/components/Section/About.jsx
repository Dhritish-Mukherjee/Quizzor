import React from 'react'
import { FaWandMagicSparkles } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import { MdSubject } from "react-icons/md";

const About = () => {

    const features = [
        {
            title: "Instant Quiz Generator",
            desc: "Create quizzes from any topic in seconds — powered by AI for speed and accuracy.",
            logo: <FaWandMagicSparkles size={30}/>
        },
        {
            title: "Smart Difficulty Levels",
            desc: "Choose Easy, Medium, or Hard based on your learning or exam needs.",
            logo: <FaFilter size={30}/>
        },
        {
            title: "Supports All Subjects",
            desc: "From Math to Biology to Coding — create quizzes for any topic or chapter.",
            logo: <MdSubject size={30}/>
        },
    ]


    
  return (
    <div className='w-full h-auto bg-white mt-20 text-black flex flex-col gap-5 py-12 px-20 items-center border-b border-gray-400'>
      <h1 className='text-6xl text-zinc-800 text-center '>The Quizzor AI Platform</h1>
      <p className='text-2xl text-zinc-700 w-1/2 text-center'>Transform knowledge into interactive quizzes for effortless, exciting learning.</p>

      <div className="features-sec w-full h-auto p-10 flex justify-center items-center">
        {features.map((item, index) => (
            <div key={index} className='p-5 flex flex-col gap-2 border-l border-zinc-600 ' >
                <p className='text-blue-500'>{item.logo}</p>
                <h3 className='text-2xl text-zinc-800'>{item.title}</h3>
                <p className='text-sm text-zinc-700 '>{item.desc}</p>
            </div>
        ))}
      </div>

    </div>
  )
}

export default About
