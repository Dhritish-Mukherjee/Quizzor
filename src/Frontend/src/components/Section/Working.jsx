import React from 'react'
import howwork_img from '../../assets/howwork_img.png'

const Working = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center bg-neutral-100 text-zinc-800 py-8 sm:py-12 px-8 sm:px-20 gap-10 border-b border-gray-400 pb-5'>
      <h1 className=' text-4xl sm:text-6xl text-zinc-800 text-center sm:w-1/2'><span className='text-blue-500'>How Quizzor</span> Brings Your Quiz to Life</h1>

      <div className="show-img p-3 sm:p-10 bg-white rounded-lg flex flex-col  sm:flex sm:flex-row justify-center gap-10 sm:gap-30 items-center">
        <div className="left w-full sm:w-1/3 flex flex-col gap-2 sm:gap-3">
            <h3 className='text-xl sm:text-3xl '>How it works</h3>
            <p className='text-gray-600 text-xs sm:text-lg'>Discover the seamless journey where Quizzor.ai analyzes your topic and creates a quiz tailored to your learning style.</p>
            <p className=' px-5 py-2 sm:px-7 sm:py-3 bg-blue-500 text-white rounded-full w-fit text-sm sm:text-lg'>Now you know it 🥳</p>
        </div>

        <div className="right w-full sm:w-1/2 border rounded-lg border-gray-300 p-1">
            <img className='rounded-lg' src={howwork_img} alt="demo_working_image" width='800px' height={50} />
        </div>
      </div>
    </div>
  )
}

export default Working
