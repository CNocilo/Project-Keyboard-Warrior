import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react';

const RegisterPage = () => {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [confPassword, setConfPassword] = useState("");
const [country, setCountry] = useState("");
const [keyboard, setKeyboard] = useState("");
const [isMatching, setIsMatching] = useState(true);

const handleRegister = async(e) => {
    e.preventDefault()
    try {
        const response = await fetch('http://127.0.0.1:8000/api/register', {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({ username, password, country, keyboard })
        })
        alert("User created!")

        if (!response.ok) {
            alert("Unable to pass through.")
        }
    } catch (error) {
        console.error('Error during login', error)
    }


}

const handlePasswordMismatch = async(e) => {
    e.preventDefault()
    alert("Please confirm your password.")
}

useEffect(() => {
    const checkPasswords = () => {
        if (password !== confPassword) {
            setIsMatching(false);
        } else {
            setIsMatching(true);
        }
    };

    checkPasswords();

    return () => {
        
    };

}, [password, confPassword, setIsMatching]); 



  return (
    <section className="flex justify-center bg-cyan-400 font-mono">
        <div className="container-lg m-[5%] p-5 bg-cyan-600 bg-opacity-50 rounded-md shadow-md">
        <div className="bg-yellow-100 p-5 m-[2%] rounded-md text-center shadow-md">
            <h6 className="font-bold text-3xl">Register here!</h6>
            <h1>Are you ready to start typing!</h1>
        </div>
        <form>
            <div className="flex-col bg-yellow-100 p-5 m-[2%] rounded-md shadow-md">
                <div className="p-[2%]">
                    <label htmlFor="username">
                        Username:
                    </label>
                    
                </div>
                <div className="p-[2%]">
                    <input className="border-2 border-gray-500 rounded-md focus:outline-cyan-500"
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            >
                        
                    </input>
                </div>
                <div className="p-[2%]">
                    <label htmlFor="password">
                        Password:
                    </label>         
                </div>
                <div className="p-[2%]">
                    <input className="border-2 border-gray-500 rounded-md focus:outline-cyan-500"
                           id="password"
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           >
                    
                    </input>
                </div>
                <div className="p-[2%]">
                    <label htmlFor="confPassword">
                        Confirm Password:
                    </label>
                </div>
                <div className="p-[2%]">
                    <input className="border-2 border-gray-500 rounded-md focus:outline-cyan-500"
                           id="confPassword"
                           type="password"
                           value={confPassword}
                           onChange={(e) => setConfPassword(e.target.value)}
                           >
                    
                    </input>
                </div>
                <div className="p-[2%]">
                    <label htmlFor="country">
                        Country:
                    </label>
                </div>
                <div className="p-[2%]">
                    <input className="border-2 border-gray-500 rounded-md focus:outline-cyan-500"
                           id="country"
                           type="text"
                           value={country}
                           onChange={(e) => setCountry(e.target.value)}
                           >
                    
                    </input>
                </div>
                <div className="p-[2%]">
                    <label htmlFor="keyboard">
                        Keyboard:
                    </label>
                </div>
                <div className="p-[2%]">
                    <input className="border-2 border-gray-500 rounded-md focus:outline-cyan-500"
                           id="keyboard"
                           type="text"
                           value={keyboard}
                           onChange={(e) => setKeyboard(e.target.value)}
                           >
                    
                    </input>
                </div>
                <div className="m-[1%] mt-3 p-[2%]">
                    <button
                        className="bg-cyan-400 rounded-md p-2 hover:text-white"
                        onClick={isMatching ? handleRegister : handlePasswordMismatch}
                        >Register

                    </button>
                </div>
                <div className="m-[1%] mt-3 p-[2%]">
                    <NavLink
                        to="/login"
                        className="bg-cyan-400 rounded-md p-2 hover:text-white"
                        >Have an account already?

                    </NavLink>
                </div>
            </div>
        </form>
        </div>

    </section>
  )
}

export default RegisterPage