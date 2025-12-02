import React from 'react'
import Hero from '../components/Section/Hero'
import About from '../components/Section/About'
import Working from '../components/Section/Working'

const Home = () => {
  return (
    <div className='w-full h-auto '>
      <Hero />
      <About />
      <Working />
    </div>
  )
}

export default Home
