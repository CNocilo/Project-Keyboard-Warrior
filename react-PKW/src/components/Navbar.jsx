import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-cyan-700">
        <div className="mx-auto bg-cyan-700 pt-7">
            <div className="flex h-10 items-center">
                <Link 
                    to="/"
                    className="text-black bg-cyan-500 hover:bg-cyan-400 hover:text-white font-mono rounded-tl-md rounded-tr-md px-3 py-2"
                    >Home
                </Link>
                <Link 
                    to="/about"
                    className="text-black bg-cyan-500 hover:bg-cyan-400 hover:text-white font-mono rounded-tl-md rounded-tr-md px-3 py-2"
                    >About
                </Link>
                <Link 
                    to="/leaderboard"
                    className="text-black bg-cyan-500 hover:bg-cyan-400 hover:text-white font-mono rounded-tl-md rounded-tr-md px-3 py-2"
                    >Leaderboard
                </Link>

            </div>
        </div>
    </nav>
  )
}

export default Navbar