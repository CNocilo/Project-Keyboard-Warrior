import React from 'react'
import logo from '../assets/temp_logo.png'

const Logo = () => {
  return (
    <section className="bg-cyan-700">
        <img className="h-44 w-auto pt-5" src={ logo } alt="Keyboard Warriors"/>
        <span className="text-2xl pl-4 font-bold text-yellow-100">
            Keyboard Warriors
        </span>

    </section>
  )
}

export default Logo