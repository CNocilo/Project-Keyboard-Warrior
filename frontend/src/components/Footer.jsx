import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-cyan-600 p-3 items-center">
        <div className="container md:mx-auto bg-cyan-500 bg-opacity-50 rounded-md shadow-md">
            <div className="flex space-x-2 items-center justify-center p-3">
                <Link
                    className="p-2 bg-yellow-100 rounded-md font-mono hover:bg-white shadow-md"
                    to='/about'
                    >About
                </Link>
                <a
                    className="p-2 bg-yellow-100 rounded-md font-mono hover:bg-white shadow-md"
                    href='/'
                    >Terms of Service
                </a>
                <a
                    className="p-2 bg-yellow-100 rounded-md font-mono hover:bg-white shadow-md"
                    href='/'
                    >Privacy Policy
                </a>
                <a
                    className="p-2 bg-yellow-100 rounded-md font-mono hover:bg-white shadow-md"
                    href='/'
                    >Contact
                </a>

            </div>
            <div className="flex space-x-2 items-center justify-center p-5">
                <Link
                    className="p-2 bg-yellow-100 rounded-md font-mono hover:bg-white shadow-md"
                    to='https://github.com/CNocilo/Project-Keyboard-Warrior'
                    >GitHub
                </Link>
                <a
                    className="p-2 bg-yellow-100 rounded-md font-mono hover:bg-white shadow-md"
                    href='/'
                    >Twitter
                </a>
                <a
                    className="p-2 bg-yellow-100 rounded-md font-mono hover:bg-white shadow-md"
                    href='/'
                    >Instagram
                </a>
                <a
                    className="p-2 bg-yellow-100 rounded-md font-mono hover:bg-white shadow-md"
                    href='/'
                    >LinkedIn
                </a>

            </div>
        </div>
    </footer>
  )
}

export default Footer