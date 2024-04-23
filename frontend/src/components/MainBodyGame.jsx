/* eslint-disable no-unused-vars */ 
import React, { useState, useEffect } from 'react'

const MainBodyGame = (options) => {
  const [score, setScore] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [currentWord, setCurrentWord] = useState("It ");
  const [passage, setPassage] = useState(["had ", "been ", "a ", "rough ", "day. ", "Things ", "hadn't ", "gone ", "as ", 
  "planned ", "and ", "that ", "meant ", "Hannah ", "got ", "yelled ", "at ", "by ", 
  "her ", "boss. ", "It ", "didn't ", "even ", "matter ", "that ", "it ", "wasn't ", 
  "her ", "fault. ", "When ", "things ", "went ", "wrong ", "at ", "work, ", 
  "Hannah ", "got ", "the ", "blame ", "no ", "matter ", "the ", "actual ", 
  "circumstances. ", "It ", "wasn't ", "fair, ", "but ", "there ", "was ", 
  "little ", "she ", "could ", "do ", "without ", "risking ", "her ", "job, ", 
  "and ", "she ", "wasn't ", "in ", "a ", "position ", "to ", "do ", "that ", 
  "with ", "the ", "plans ", "she ", "had. "]);

  const [wordHistory, setWordHistory] = useState([]);
  const [misses, setMisses] = useState(0);

  const keyDown = (event) => {
    const inputChar = event.key;
    const targetChar = currentWord[currentChar];

    if (inputChar === targetChar) {
      setScore(score + 10);
      
      setCurrentChar(currentChar + 1);

      if (currentChar >= currentWord.length - 1 && passage.length > 0) {
        setWordHistory((prev) => [...prev, currentWord]);
        setCurrentWord(passage[0]);
        setPassage((prev) => prev.slice(1));
        setCurrentChar(0);
      }
    }

  }

  useEffect(() => {
    // Add event listener for keydown event
    window.addEventListener('keydown', keyDown);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [[currentChar, score]]);

  return (
    <section className="pb-[2%] pl-[2%] pt-[2%]">
      <div className="container mx-auto bg-yellow-100 justify-center rounded-md p-5 tracking-widest font-mono shadow-md">
        <div className="font-bold">
          <p>{wordHistory.join(" ")} {' '}
          {currentWord.split('').map((char, index) => (
              <span
                key={index}
                style={{
                  textDecoration: currentChar === index ? 'underline' : 'none', // Highlight current character
                  color: currentChar === index ? 'red' : 'black',
                }}
              >
                {char}
              </span>
            ))}{" "}
          {passage.join(" ")}</p><br />
          <p>{"Score: "}{score} {options.time}</p>
        </div>
      </div>
    </section>
  )
}

export default MainBodyGame
