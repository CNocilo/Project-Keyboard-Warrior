/* eslint-disable no-unused-vars */ 
import React, { useState } from 'react'
import MainBodyGame from '../components/MainBodyGame'

const GameOptions = (options) => {
    const [time, setTime] = useState(30);
    const [words, setWords] = useState(50);
    const {timeOption, wordOption} = options;

    const handleTime = (button) => {
        setTime(button);
    }
    const handleWords = (button) => {
        setWords(button);
    }

  return (
    <section className="p-[2%]">
        <div className="container m-auto bg-yellow-100 p-5 rounded-md justify-center font-mono shadow-md">
            <div className="bg-yellow-50 p-2 text-center rounded-md">
                Time(Seconds)
            </div>
           <div className="flex space-x-2 pt-1 justify-center">
                <button 
                    onClick={() => handleTime(15)}
                    style={{ color: time === 15 ? 'gray' : 'black' }}>
                <p>
                    15
                </p></button>
                <button 
                    onClick={() => handleTime(30)}
                    style={{ color: time === 30 ? 'gray' : 'black' }}>
                <p>
                    30
                </p></button>
                <button 
                    onClick={() => handleTime(60)}
                    style={{ color: time === 60 ? 'gray' : 'black' }}>
                <p>
                    60
                </p></button>
                <button 
                    onClick={() => handleTime(120)}
                    style={{ color: time === 120 ? 'gray' : 'black' }}>
                <p>
                    120
                </p></button>
           </div>
        </div>
        <div className="container mt-[5%] bg-yellow-100 p-5 rounded-md justify-center font-mono shadow-md">
            <div className="bg-yellow-50 p-2 text-center rounded-md">
                Words
            </div>
           <div className="flex space-x-2 pt-1 justify-center">
                <button 
                    onClick={() => handleWords(10)}
                    style={{ color: words === 10 ? 'gray' : 'black' }}>
                <p>
                    10
                </p></button>
                <button 
                    onClick={() => handleWords(25)}
                    style={{ color: words === 25 ? 'gray' : 'black' }}>
                <p>
                    25
                </p></button>
                <button 
                    onClick={() => handleWords(50)}
                    style={{ color: words === 50 ? 'gray' : 'black' }}>
                <p>
                    50
                </p></button>
                <button 
                    onClick={() => handleWords(100)}
                    style={{ color: words === 100 ? 'gray' : 'black' }}>
                <p>
                    100
                </p></button>
                
           </div>
        </div>
    </section>
  )
}

export default GameOptions