import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { AuthContext } from './AuthContext';

const Navbar = () => {
    const { isAuthenticated, username } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/logout', {method: 'POST', credentials: 'include'});
            const data = await response.json();

            if (response.ok) {    // logout succeeded
                window.location.reload(); // Reload the page
            } else {
                console.error('Logout failed:', data);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

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
                    { !isAuthenticated ? 
                    <NavLink 
                        to="/login"
                        className={({ isActive }) =>
                            isActive ? 'bg-cyan-400 text-black hover:bg-cyan-400 hover:text-white font-mono rounded-tl-md rounded-tr-md px-3 py-2' 
                                    : 'bg-cyan-500 text-black hover:bg-cyan-400 hover:text-white font-mono rounded-tl-md rounded-tr-md px-3 py-2'}
                        >Login/Register    
                    </NavLink>

                    :
                    
                    <NavLink
                        to=''
                        className='bg-cyan-500 text-black hover:bg-cyan-400 hover:text-white font-mono rounded-tl-md rounded-tr-md px-3 py-2'>
                        <button                       
                            onClick={handleLogout}
                            >Logout

                        </button>
                    </NavLink>

                    }

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
