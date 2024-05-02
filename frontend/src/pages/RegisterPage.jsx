import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react';
import ReactCountryFlag from "react-country-flag";
import countriesData from '../countries.json'
import 'flowbite'


const RegisterPage = () => {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [confPassword, setConfPassword] = useState("");
const [country, setCountry] = useState("");
const [countryName, setCountryName] = useState("");
const [countryIsSel, setCountryIsSel] = useState(false);
const [keyboard, setKeyboard] = useState("");
const [isMatching, setIsMatching] = useState(true);

const { countries } = countriesData;

const handleRegister = async(e) => {
    e.preventDefault()
    try {
        const response = await fetch('http://localhost:8000/api/register', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
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

useEffect(() => {
    const checkSelCountry = () => {
        if (country !== "") {
            setCountryIsSel(true)
        } else {
            setCountryIsSel(false)
        }
    }
}) 



  return (
    <section className="flex justify-center bg-cyan-400 font-mono">
        <div className="container-lg m-[5%] p-5 bg-cyan-600 bg-opacity-50 rounded-md shadow-md">
        <div className="bg-yellow-100 p-5 m-[2%] rounded-md text-center shadow-md">
            <h6 className="font-bold text-3xl">Register here!</h6>
            <h1>Are you ready to start typing?!</h1>
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
                {/* <div className="p-[2%]">
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
                </div> */}
                <div className="flex-col p-[2%]">
                    <label htmlFor="country" className="flex pb-[3%]">
                            Country:
                    </label>
                    <input className="cursor-not-allowed mb-[5%] border-2 border-gray-500 rounded-md focus:outline-cyan-500"
                           id="country"
                           type="text"
                           value={countryName}
                           onChange={(e) => setCountry(e.target.value)}
                           >
                    
                    </input>
                    <button id="dropdownDefaultButton" 
                            data-dropdown-toggle="dropdown" 
                            className="text-black bg-cyan-400 hover:bg-cyan-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" 
                            type="button"
                            >{ countryIsSel ? country : "Select Country Here"} {/* Doesn't work.. */}
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                    </button>
                    <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul className="py-2 text-sm text-gray-700 overflow-y-auto max-h-[200px]" aria-labelledby="dropdownDefaultButton">

                            {countries.map((country, index) => (
                                <li key={index} className="flex">
                                <ReactCountryFlag countryCode={country.abbreviation} svg className="text-lg ml-4 mt-2"></ReactCountryFlag>
                                <button 
                                    className="block px-4 py-2 hover:bg-gray-200"
                                    type="button"
                                    value={country.abbreviation}
                                    onClick={(e) => {
                                        setCountry(country.abbreviation)
                                        setCountryName(country.name)
                                    }}>{country.name}</button>
                                </li>
                            ))}
                        
                        
                        </ul>
                    </div>
                </div>

                <div className="flex-col p-[2%]">
                    <label htmlFor="keyboard" className="flex pb-[3%]">
                            Keyboard Layout:
                    </label>
                    <input className="cursor-not-allowed mb-[5%] border-2 border-gray-500 rounded-md focus:outline-cyan-500"
                           id="keyboard"
                           type="text"
                           value={keyboard}
                           >
                    
                    </input>
                    <button id="dropdownDefaultButtonKB" 
                            data-dropdown-toggle="dropdownKB" 
                            className="text-black bg-cyan-400 hover:bg-cyan-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" 
                            type="button"
                            >Select Keyboard Here
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                    </button>
                    <div id="dropdownKB" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-22">
                        <ul className="py-2 text-sm text-gray-700 overflow-y-auto max-h-[200px]" aria-labelledby="dropdownDefaultButtonKB">

                            <li className="flex-col">
                                <button 
                                    className="block px-4 py-2 hover:bg-gray-200"
                                    type="button"
                                    onClick={(e) => {
                                        setKeyboard('qwerty')
                                    }}>Qwerty
                                </button>
                                <button 
                                    className="block px-4 py-2 hover:bg-gray-200"
                                    type="button"
                                    onClick={(e) => {
                                        setKeyboard('qwertz')
                                    }}>Qwertz
                                </button>
                                <button 
                                    className="block px-4 py-2 hover:bg-gray-200"
                                    type="button"
                                    onClick={(e) => {
                                        setKeyboard('dvorak')
                                    }}>Dvorak
                                </button>
                                <button 
                                    className="block px-4 py-2 hover:bg-gray-200"
                                    type="button"
                                    onClick={(e) => {
                                        setKeyboard('colemak')
                                    }}>Colemak
                                </button>


                            </li>
                        
                        
                        </ul>
                    </div>
                </div>

                {/* <div className="p-[2%]">
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
                </div> */}
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