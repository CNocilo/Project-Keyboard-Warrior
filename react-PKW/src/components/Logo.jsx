import React from 'react'
import logo from '../assets/temp_logo.png'

const Logo = () => {
  return (
    <section className="bg-[url('Project-Keyboard-Warrior\react-PKW\src\assets\An_blue_asian_landscape_painting_using_only_colors_around_hex_0e7490_hex_fef9c3_white_and_black_628335274.png')]">
        <img className="h-44 w-auto pt-5" src={ logo } alt="Keyboard Warriors"/>
        <span className="text-2xl pl-4 font-bold text-yellow-100 font-mono">
            Keyboard Warriors
        </span>

    </section>
  )
}

export default Logo