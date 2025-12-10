import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Quiz = () => {

    const navigate = useNavigate();

    const diffCards = [
       {
         title : "See All Quizzes",
         logo: '🗒️',
        desc : "Here are all the pre-built quizes you can participate",
        navigate : "/dashboard/quiz/quizes"
       },
       {
         title : "See Live Quizzes",
         logo:'🚀',
        desc : "Here are all the live quizes you can participate",
        navigate : "/dashboard/quiz/live"
       },
       {
         title : "Generate Quiz with AI",
         logo: '🤖',
        desc : "generate quizes with AI and enjoy the time",
        navigate : "/dashboard/quiz/ai"
       },

    ]

    const handleClick = (path) => {
        navigate(path)
    }

  return (
    <div className=''>
      <div className="cards flex flex-col gap-3 sm:flex sm:flex-row sm:flex-wrap sm:gap-5 mb-10">
        {diffCards.map((item, index) => (
            <div onClick={() => handleClick(item.navigate)} key={index} className="card p-3 sm:p-5 border border-zinc-500  rounded-lg flex flex-col gap-2 hover:scale-105 hover:shadow-gray-500 shadow-gray-500 shadow-md hover:shadow-lg transition-all duration-300  ">
                <p className='p-2 sm:p-3 bg-zinc-800 w-fit rounded-lg  '>{item.logo}</p>
                <h3 className='text-md sm:text-lg text-blue-500 '>{item.title}</h3>
                <p className='text-xs sm:text-sm text-zinc-500'>{item.desc}</p>
            </div>
        ))}
      </div>

      <Outlet />
    </div>
  )
}

export default Quiz
