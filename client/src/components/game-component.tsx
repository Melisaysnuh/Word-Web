import './game-component.css';
import React, { useState, useEffect } from 'react';
import { getDailyLetters, checkWord } from '../services/api-client-service.tsx';


function GameComponent () {
    const [dailyLetters, setDailyLetters] = useState<string[]>([]);
    const [guess, setGuess] = useState('');


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
        setGuess(`${guess}${event.target.value.toUpperCase() }`)
    }
    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault();

         setGuess('');

    }
    const handleShuffle = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        const shuffled = generateRandomIndices(dailyLetters);
       setDailyLetters(shuffled);
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const word = guess;
        checkWord(word);
        console.log('client sending ', word)
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
        }
        fetchShuffle();
    }, []);


    return (
        <>

            <div id='game-container' className='block'>

                <img id='spiderweb' src='/spiderweb.svg' />

                <form id="letter-form" >

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
