import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({ username, password })
            })
            const result = await response.json()
            alert(`User logged in! Welcome ${username}!`)

            if (!response.ok) {
                alert("Incorrect username or password.")
                throw new Error('Error with signing into network');
            }

        } catch (error) {
            console.error('Error during login', error)
        }
    }


  return (
    <section className="flex justify-center bg-cyan-400 font-mono">
        <div className="container-md m-[5%] p-5 bg-cyan-600 bg-opacity-50 rounded-md shadow-md">
        <div className="bg-yellow-100 p-5 m-[2%] rounded-md text-center shadow-md">
            <h6 className="font-bold text-3xl">Sign in!</h6>
            <h1>Get ready to start typing!</h1>
        </div>
        <form>
            <div className="flex-col bg-yellow-100 p-5 m-[2%] rounded-md shadow-md">
                <div className="m-[1%] p-[2%]">
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input className="border-2 border-gray-500 rounded-md focus:outline-cyan-500"
                           id="username"
                           type="text"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}>
                    
                    </input>
                </div>
                <div className="m-[1%] p-[2%]">
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input className="border-2 border-gray-500 rounded-md focus:outline-cyan-500"
                           id="password"
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}>
                    
                    </input>
                </div>
                <div className="m-[1%] mt-3 p-[2%]">
                    <button
                        className="bg-cyan-400 rounded-md p-2 hover:text-white"
                        onClick={handleLogin}
                        >Login

                    </button>
                </div>
                <div className="m-[1%] mt-3 p-[2%]">
                    <NavLink
                        to="/register"
                        className="bg-cyan-400 rounded-md p-2 hover:text-white"
                        >Need to sign up?

                    </NavLink>
                </div>
                
            </div>
        </form>
        </div>

    </section>
  )
}

export default LoginPage