import React from 'react'
import Hero from '../components/Section/Hero'
import About from '../components/Section/About'
import Working from '../components/Section/Working'
import Features from '../components/Section/Features'

const Home = () => {
  return (
    <div className='w-full h-auto '>
      <Hero />
      <About />
      <Working />
      <Features />
    </div>
  )
}

export default Home
