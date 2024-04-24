/* eslint-disable no-unused-vars */ 
import React, { useState, useEffect, useContext } from 'react'

const MainBodyGame = () => {
  const [isRunning, setIsRunning] = useState(true);
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
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [timer, setTimer] = useState(0);

  const [time, setTime] = useState(30);
  const [words, setWords] = useState(50);

  const handleTime = (button) => {
      setTime(button);
  }
  const handleWords = (button) => {
      setWords(button);
  }

  const fetchLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/checkloggedin'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data');
      }
      const data = await response.json();
      if (data.authenticated) {
        setIsLoggedIn(1);
      }
      else {
        setIsLoggedIn(2);
      }
    } catch (error) {
      console.error('Error fetching login data:', error);
    }
  };

  // Fetch leaderboard data when the component mounts
  useEffect(() => {
    fetchLogin();
    //setIsLoggedIn(100);
  }, []);

  const keyDown = (event) => {
    const inputChar = event.key;
    const targetChar = currentWord[currentChar];

    if (wordHistory.length === 0) {
      setStartTime(Date.now());
      //setTimeout(() => {
      //  setIsRunning(false);
      //}, 15000)
    }

    if (inputChar === targetChar && isRunning) {
      setScore(score + 1);
      
      setCurrentChar(currentChar + 1);

      if (currentChar >= currentWord.length - 1 && passage.length > 0) {
        setWordHistory((prev) => [...prev, currentWord]);
        setCurrentWord(passage[0]);
        setPassage((prev) => prev.slice(1));
        setCurrentChar(0);
      }
      else if (passage.length === 0) {
        passage;
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
    if (score > 3 && isRunning) {
      setWPM(Math.round((score * (60 / ((endTime - startTime) / 1000))) / 5));
      setAccuracy(Math.round((score / (misses + score)) * 100));
    }
      // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [[currentChar, score]]);

  return (
    <div className="container bg-cyan-600 mx-auto bg-opacity-50 flex rounded-md shadow-md">
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
            <p>{"WPM: "}{wpm}</p><br />
            <p>{"Time/Words: "}{time}{words}</p><br />
          </div>
        </div>
      </section>
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
    </div>
  )
}

export default MainBodyGame
