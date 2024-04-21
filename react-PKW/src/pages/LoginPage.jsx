import React from 'react'
import { NavLink } from 'react-router-dom'

const LoginPage = () => {
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
                    <label>
                        Username:
                    </label>
                    <input className="border-2 border-gray-500 rounded-md focus:outline-cyan-500">
                    
                    </input>
                </div>
                <div className="m-[1%] p-[2%]">
                    <label>
                        Password:
                    </label>
                    <input className="border-2 border-gray-500 rounded-md focus:outline-cyan-500">
                    
                    </input>
                </div>
                <div className="m-[1%] mt-5 p-[2%]">
                    <NavLink
                        to="/login"
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