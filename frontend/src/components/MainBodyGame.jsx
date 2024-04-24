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
  //const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const keyDown = (event) => {
    const inputChar = event.key;
    const targetChar = currentWord[currentChar];

    if (wordHistory.length === 0) {
      setStartTime(Date.now());
    }

    if (inputChar === targetChar) {
      setScore(score + 1);
      
      setCurrentChar(currentChar + 1);

      if (currentChar >= currentWord.length - 1 && passage.length > 0) {
        setWordHistory((prev) => [...prev, currentWord]);
        setCurrentWord(passage[0]);
        setPassage((prev) => prev.slice(1));
        setCurrentChar(0);
      }
    }
    else if (event.key !== 'Shift' && event.key !== 'CapsLock') {
      setMisses(misses + 1);
    }

  }

  useEffect(() => {
    // Add event listener for keydown event
    window.addEventListener('keydown', keyDown);
    setEndTime(Date.now());
    if (score > 3) {
      setWPM(Math.round((score * (60 / ((endTime - startTime) / 1000))) / 5));
      setAccuracy(Math.round((score / (misses + score)) * 100));
    }
    else {
      setWPM(0);
    }
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
          <p>{"Score: "}{score}</p><br />
          <p>{"Accuracy: "}{accuracy}</p><br />
          <p>{"Misses: "}{misses}</p><br />
          <p>{"WPM: "}{wpm}</p>
        </div>
      </div>
    </section>
  )
}

export default MainBodyGame
