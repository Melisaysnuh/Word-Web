import './game-component.css';
import React, { useState, useEffect } from 'react';
import { getDailyList, checkWord } from '../services/api-client-service.tsx';
import { WordObj } from '../types/WordObj.ts';
import { GameComponentProps } from '../types/GameComponent.ts';



function GameComponent ({ guessedWords, setGuessedWords, setTotalPoints}: GameComponentProps) {
    const [dailyLetters, setDailyLetters] = useState<string[]>([]);
    const [guess, setGuess] = useState('');
    const [formStatus, setFormStatus] = useState({ success: 'none', message: '' });






    async function fetchDailyList () {
        try {
            const list = await getDailyList();
            if (list) {

                return list;
            } else console.log('you are not yet fetching your info')
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

    async function handleSubmit (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) {
        event.preventDefault();
        const word = guess;
        if (word.length < 4) {
            setFormStatus({ success: 'fail', message: 'Words must be at least four letters.' });

        } else if (guessedWords.some((element:WordObj) => element.word.toUpperCase() === word)) {
            setFormStatus({ success: 'fail', message: 'Word already found.' });
        }
            else {
            const res = await checkWord(word, { guessedWords, setGuessedWords });
            if (res) {
                setFormStatus({ success: 'fail', message: 'Word not in list.' });
            } else
                setFormStatus({ success: 'pass', message: 'nice!' });
        }
        setGuess('');
    }



    useEffect(() => {
        async function fetchShuffle () {
            const list = await fetchDailyList();
            const letters = list.letters;
            const totalP = list.totalPoints;
            const shuffled = generateRandomIndices(letters);
            setDailyLetters(shuffled);
            setGuess('');
            setFormStatus({ success: 'none', message: '' });
            setTotalPoints(totalP);
        }
        fetchShuffle();
    }, [setTotalPoints]);



    return (
        <>

            <div id='game-container' className='block'>

                <img id='spiderweb' src='/spiderweb.svg' />

                <form className="letter-form" >
<div id='message' className={formStatus.success}>{formStatus.message}</div>
                    <input type='text'
                        className='text-input'
                        value={guess}
                        onChange={handleTextInput}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                handleSubmit(event);
                            }
                        }}

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
                        <button type='submit'
                        key='submit'
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
