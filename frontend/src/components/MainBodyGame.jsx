/* eslint-disable no-unused-vars */ 
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MainBodyGame = () => {
  const { isAuthenticated, username } = useContext(AuthContext);
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
  //const [timer, setTimer] = useState(0);
  //const [time, setTime] = useState(30);
  const [words, setWords] = useState(25);

  const [shouldReinit, setShouldReinit] = useState(false);

  const handleWords = (button) => {
    if (words !== button) {
      setWords(button);
      setShouldReinit(true);  // Set flag to true to indicate reInit should run
    }
  };
  
  useEffect(() => {
    if (shouldReinit) {
      reInit();
      setShouldReinit(false);  // Reset flag
    }
  }, [shouldReinit]);
  
  const reInit = () => {
    setPassage([]);
    setCurrentWord("");
    setWordHistory([]);
    setCurrentChar(0);
    setIsFinished(false);
    setScore(0);
    setMisses(0);
    setWPM(0);
    randomizePassage(words);
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomizePassage = (wordNum) => {
    const randomWord = wordBank[getRandomInt(0,199)];
    const capitalizedWord = randomWord.charAt(0).toUpperCase() + randomWord.slice(1);
    setCurrentWord(capitalizedWord);
    for (let i = 0; i < wordNum; i++) {
      setPassage((prev) => [...prev, wordBank[getRandomInt(0,199)]]);
    }
  }

  /*const handleTime = (button) => {
    setTime(button);
  }
  const handleWords = (button) => {
    setWords(button);
    reInit();
  }*/

  const handleLeaderboard = async () => {
    if (isAuthenticated && isFinished) {
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
                throw new Error('Error inserting game.');
            } else {
                toast.success("Game finished and entered into db!", {
                  position: 'bottom-right',
                  autoClose: 3000
                });
            }

        } catch (error) {
            console.error('Error during login', error)
        }
    } else if (!isFinished) {
        toast.error("You must finish the game first.", {
          position: 'bottom-right',
          autoClose: 3000
        });
    } else {
        toast.error("You must be logged in to Upload your score.", {
          position: 'bottom-right',
          autoClose: 3000
        });
    }
  }



  // Fetch leaderboard data when the component mounts
  useEffect(() => {
    randomizePassage(12);
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
        //handleLeaderboard();
        setIsFinished(true);
      }
    }
    else if (event.key !== 'Shift' && event.key !== 'CapsLock' && !isFinished) {
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
        
        <div className="container mt-[5%] bg-yellow-100 p-5 rounded-md justify-center font-mono shadow-md">
            <div className="bg-yellow-50 p-2 text-center rounded-md">
                Words
            </div>
           <div className="flex space-x-2 pt-1 justify-center">
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
                    onClick={() => handleWords(75)}
                    style={{ color: words === 75 ? 'gray' : 'black' }}>
                <p>
                    75
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
                    style={{ color: isFinished ? 'black' : 'gray' }}>
                <p>
                    Upload
                </p></button>    
           </div>
        </div>
    </section>
    </div>
  )
}

export default MainBodyGame


/* Time buttons, removing for now
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
*/