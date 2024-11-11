import './game-component.css';
import React, { useState, useEffect } from 'react';
import { getDailyLetters, checkWord } from '../services/api-client-service.tsx';
import { WordObj } from '../types/WordObj.ts';

interface GameComponentProps {
    guessedWords: WordObj[];
    setGuessedWords: React.Dispatch<React.SetStateAction<WordObj[]>>;
}

function GameComponent ({ guessedWords, setGuessedWords }: GameComponentProps) {
    const [dailyLetters, setDailyLetters] = useState<string[]>([]);
    const [guess, setGuess] = useState('');
    const [formStatus, setFormStatus] = useState({ success: 'none', message: '' });





    async function fetchDailyLetters () {
        try {
            const letters = await getDailyLetters();
            if (letters) {
                return letters;
            } else console.log('you are not yet fetching letters')
        }
        catch (e) {
            console.log('error in fetchDaily in game component:', e)
        }
    }

    function generateRandomIndices (letters: string[]) {

        const remainingLetters = letters.slice(1);
        const shuffled = [letters[0]]
        while (remainingLetters.length) {
            const randomIndex = Math.floor(Math.random() * remainingLetters.length);
            shuffled.push(remainingLetters.splice(randomIndex, 1)[0]);
        }

        return shuffled;

    };
    const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGuess(event.target.value.toUpperCase())
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault();

        setGuess(`${guess}${event.target.value.toUpperCase()}`)
    }
    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault();

         setGuess('');
        setFormStatus({ success: 'none', message: '' });

    }
    const handleShuffle = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        const shuffled = generateRandomIndices(dailyLetters);
       setDailyLetters(shuffled);
        setFormStatus({ success: 'none', message: '' });
    }

    async function handleSubmit (event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const word = guess;
        if (word.length < 4) {
            setFormStatus({ success: 'fail', message: 'Words must be at least four letters.' });

        } else if (guessedWords.some((element:WordObj) => element.word.toUpperCase() === word)) {
            setFormStatus({ success: 'fail', message: 'Word already found.' });
        }
            else {
          try {
              const guessedWord: WordObj | null | undefined = await checkWord(word.toLowerCase());
              if (guessedWord) {


                  setGuessedWords([...guessedWords, guessedWord]);

              }


          }
          catch (e) {
            console.log(e)
          }


        }
        setGuess('');
    }
   /*  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        return guess + event;
    } */



    useEffect(() => {
        async function fetchShuffle () {
            const letters = await fetchDailyLetters();
            const shuffled = generateRandomIndices(letters);
            setDailyLetters(shuffled);
            setGuess('');
            setFormStatus({ success: 'none', message: '' });
        }
        fetchShuffle();
    }, []);


    return (
        <>

            <div id='game-container' className='block'>

                <img id='spiderweb' src='/spiderweb.svg' />

                <form id="letter-form" >
<div id='message' className={formStatus.success}>{formStatus.message}</div>
                    <input type='text'
                        id='text-input'
                        value={guess}
                        onChange={handleTextInput}

                    ></input>
                    <div className='gameholder'>
                        {
                            dailyLetters.map(
                                (letter, index) => (
                                    <button
                                        key={index}
                                        id={`pos${index + 1}`}
                                        className='hex-button'
                                        onClick={handleClick}
                                        value={letter}
                                    >{letter.toUpperCase()}</button>
                                )

                            )
                        }
                    </div>
                  <div id='button-holder'>
                        <button key='clear'
                            className='other-button'
                            onClick={handleClear}
                        >CLEAR</button>
                        <span className="material-symbols-outlined"
                        onClick={handleShuffle}>
                            shuffle
                        </span>
                        <button key='submit'
                            className='other-button'
                            onClick={handleSubmit}
                        >SUBMIT</button>
                  </div>
                </form>
            </div>


        </>
    )
}

export default GameComponent
