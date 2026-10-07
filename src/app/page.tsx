import React from 'react'
import { Hero } from './components/Hero'
import { Services } from './components/Services'

const page = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='bg-linear-to-b from-blue-300/30 to-blue-100/30 min-h-[calc(100vh-85px)]'>
        <Hero />
      </div>
      <Services />
    </div>
  )
}

export default page