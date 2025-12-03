import React from 'react'
import Hero from '../components/Section/Hero'
import About from '../components/Section/About'
import Working from '../components/Section/Working'
import Features from '../components/Section/Features'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='w-full h-auto '>
       <Navbar />
      <Hero />
      <About />
      <Working />
      <Features />
      <Footer />
    </div>
  )
}

export default Home
