import React from 'react'
import MainBodyGame from '../components/MainBodyGame'
import GameOptions from '../components/GameOptions'

const HomePage = () => {
  return (
    <>
      <section className="bg-cyan-400 px-[12.5%] py-[5%]">
        <div className="container bg-cyan-600 mx-auto bg-opacity-50 flex rounded-md shadow-md">
          <MainBodyGame />
          <GameOptions />
        </div>
      </section>
      
    </>
  )
}

export default HomePage