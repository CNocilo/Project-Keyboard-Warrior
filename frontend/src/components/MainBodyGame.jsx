/* eslint-disable no-unused-vars */ 
import React, { useState, useEffect, useContext } from 'react'

const MainBodyGame = () => {
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [passage, setPassage] = useState([]);
  const wordBank = ["the ", "be ", "of ", "and ", "a ", "to ", "in ", "he ", "have ", "it ", "that ", "for ", "they ", "I ", "with ", "as ", "not ", "on ", "she ", "at ", "by ", "this ", "we ", "you ", "do ", "but ", "from ", "or ", "which ", "one ", "would ", "all ", "will ", "there ", "say ", "who ", "make ", "when ", "can ", "more ", "if ", "no ", "man ", "out ", "other ", "so ", "what ", "time ", "up ", "go ", "about ", "than ", "into ", "could ", "state ", "only ", "new ", "year ", "some ", "take ", "come ", "these ", "know ", "see ", "use ", "get ", "like ", "then ", "first ", "any ", "work ", "now ", "may ", "such ", "give ", "over ", "think ", "most ", "even ", "find ", "day ", "also ", "after ", "way ", "many ", "must ", "look ", "before ", "great ", "back ", "through ", "long ", "where ", "much ", "should ", "well ", "people ", "down ", "own ", "just ", "because ", "good ", "each ", "those ", "feel ", "seem ", "how ", "high ", "too ", "place ", "little ", "world ", "very ", "still ", "nation ", "hand ", "old ", "life ", "tell ", "write ", "become ", "here ", "show ", "house ", "both ", "between ", "need ", "mean ", "call ", "develop ", "under ", "last ", "right ", "move ", "thing ", "general ", "school ", "never ", "same ", "another ", "begin ", "while ", "number ", "part ", "turn ", "real ", "leave ", "might ", "want ", "point ", "form ", "off ", "child ", "few ", "small ", "since ", "against ", "ask ", "late ", "home ", "interest ", "large ", "person ", "end ", "open ", "public ", "follow ", "during ", "present ", "without ", "again ", "hold ", "govern ", "around ", "possible ", "head ", "consider ", "word ", "program ", "problem ", "however ", "lead ", "system ", "set ", "order ", "eye ", "plan ", "run ", "keep ", "face ", "fact ", "group ", "play ", "stand ", "increase ", "early ", "course ", "change ", "help ", "line "]
  const [wordHistory, setWordHistory] = useState([]);
  const [misses, setMisses] = useState(0);
  //const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [timer, setTimer] = useState(0);
  const [time, setTime] = useState(30);
  const [words, setWords] = useState(10);

  const reInit = () => {
    setPassage([]);
    setCurrentWord("");
    setWordHistory([]);
    setCurrentChar(0);
    randomizePassage();
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomizePassage = () => {
    setCurrentWord(wordBank[getRandomInt(0,199)]);
    //setCurrentWord(currentWord.charAt(0).toUpperCase() + currentWord.slice(1));
    for (let i = 0; i < words; i++) {
      setPassage((prev) => [...prev, wordBank[getRandomInt(0,199)]]);
    }
  }

  const handleTime = (button) => {
    setTime(button);
  }
  const handleWords = (button) => {
    //setWords(button);
    //reInit();
  }

  const handleLeaderboard = async () => {
    try{
        const response = await fetch('http://localhost:8000/api/finishedgame', {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({ wpm })
        })
        const result = await response.json()
        

        if (!response.ok) {
            alert("Error when signing in.")
            throw new Error('Error with signing into network');
        }
        else {
            alert(`User logged in! Welcome ${username}!`)
        }

      } catch (error) {
          console.error('Error during login', error)
      }
  }

  const fetchLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/checkloggedin', {
                                    credentials: 'include',
                                  }); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch login data');
      }
      const data = await response.json();
      if (data.authenticated) {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error fetching login data:', error);
    }
  };

  // Fetch leaderboard data when the component mounts
  useEffect(() => {
    fetchLogin();
    randomizePassage();
  }, []);

  const keyDown = (event) => {
    const inputChar = event.key;
    const targetChar = currentWord[currentChar];

    if (wordHistory.length === 0) {
      setStartTime(Date.now());
    }

    if (inputChar === targetChar && !isFinished) {
      setScore(score + 1);
      
      setCurrentChar(currentChar + 1);

      if (currentChar >= currentWord.length - 1) {
        setWordHistory((prev) => [...prev, currentWord]);
        setCurrentWord(passage[0]);
        setPassage((prev) => prev.slice(1));
        setCurrentChar(0);
      }
      else if (currentChar === currentWord.length - 2 && passage.length === 0){
        handleLeaderboard();
        setIsFinished(true);
      }
    }
    else if (event.key !== 'Shift' && event.key !== 'CapsLock') {
      setMisses(misses + 1);
    }

  }

  useEffect(() => {
    // Add event listener for keydown event
    window.addEventListener('keydown', keyDown);
    if (!isFinished) {
      setEndTime(Date.now());
      if (score > 3) {
        setWPM(Math.round((score * (60 / ((endTime - startTime) / 1000))) / 5));
        setAccuracy(Math.round((score / (misses + score)) * 100));
      }
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
            <p>{"WPM: "}{wpm}</p>
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
        <div className="container mt-[5%] bg-yellow-100 p-5 rounded-md justify-center font-mono shadow-md">
            <div className="bg-yellow-50 p-2 text-center rounded-md">
                Post to Leaderboard
            </div>
           <div className="flex space-x-2 pt-1 justify-center">
                <button 
                    onClick={() => handleLeaderboard()}
                    style={{ color: words === (isFinished ? 'gray' : 'black' )}}>
                <p>
                    10
                </p></button>    
           </div>
        </div>
    </section>
    </div>
  )
}

export default MainBodyGame
