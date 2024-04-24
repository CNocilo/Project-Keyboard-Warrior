import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <div className="mx-auto bg-cyan-700 pt-7">
            <div className="flex h-10">
                <NavLink 
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'bg-cyan-400 text-black hover:bg-cyan-400 hover:text-white font-mono rounded-tl-md rounded-tr-md px-3 py-2' 
                                 : 'bg-cyan-500 text-black hover:bg-cyan-400 hover:text-white font-mono rounded-tl-md rounded-tr-md px-3 py-2'}
                    >Home
                </NavLink>
                <NavLink 
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? 'bg-cyan-400 text-black hover:bg-cyan-400 hover:text-white font-mono rounded-tl-md rounded-tr-md px-3 py-2' 
                                 : 'bg-cyan-500 text-black hover:bg-cyan-400 hover:text-white font-mono rounded-tl-md rounded-tr-md px-3 py-2'}
                    >About
                </NavLink>
                <NavLink 
                    to="/leaderboard"
                    className={({ isActive }) =>
                        isActive ? 'bg-cyan-400 text-black hover:bg-cyan-400 hover:text-white font-mono rounded-tl-md rounded-tr-md px-3 py-2' 
                                 : 'bg-cyan-500 text-black hover:bg-cyan-400 hover:text-white font-mono rounded-tl-md rounded-tr-md px-3 py-2'}
                    >Leaderboard
                </NavLink>
                <NavLink 
                    to="/login"
                    className={({ isActive }) =>
                        isActive ? 'bg-cyan-400 text-black hover:bg-cyan-400 hover:text-white font-mono rounded-tl-md rounded-tr-md px-3 py-2' 
                                 : 'bg-cyan-500 text-black hover:bg-cyan-400 hover:text-white font-mono rounded-tl-md rounded-tr-md px-3 py-2'}
                    >Login/Register    
                </NavLink>

            </div>
            {/* <div className = "flex justify-end h-10">
                <NavLink 
                    to="/"
                    className="text-black bg-cyan-500 hover:bg-cyan-400 hover:text-white font-mono rounded-tl-md rounded-tr-md px-3 py-2"
                    >Login    
                </NavLink>
            </div> */}
        </div>
    </nav>
  )
}

export default Navbar