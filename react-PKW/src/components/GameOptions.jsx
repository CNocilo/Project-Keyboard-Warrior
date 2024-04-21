import React from 'react'

const GameOptions = () => {
  return (
    <section className="p-[2%]">
        <div className="container m-auto bg-yellow-100 p-5 rounded-md justify-center font-mono shadow-md">
            <div className="bg-yellow-50 p-2 text-center rounded-md">
                Time(Seconds)
            </div>
           <div className="flex space-x-2 pt-1 justify-center">
                <p className="text-black font-mono">
                    15
                </p>
                <p className="text-black font-mono">
                    30
                </p>
                <p className="text-black font-mono">
                    60
                </p>
                <p className="text-black font-mono">
                    120
                </p>
                <p className="text-black font-mono">
                    ##
                </p>
           </div>
        </div>
        <div className="container mt-[5%] bg-yellow-100 p-5 rounded-md justify-center font-mono shadow-md">
            <div className="bg-yellow-50 p-2 text-center rounded-md">
                Words
            </div>
           <div className="flex space-x-2 pt-1 justify-center">
                <p className="text-black font-mono">
                    10
                </p>
                <p className="text-black font-mono">
                    25
                </p>
                <p className="text-black font-mono">
                    50
                </p>
                <p className="text-black font-mono">
                    100
                </p>
                <p className="text-black font-mono">
                    ##
                </p>
           </div>
        </div>
    </section>
  )
}

export default GameOptions