import './game-component.css';
import React, { useState, useEffect, ButtonHTMLAttributes } from 'react';
import { getDailyList } from '../services/api-client-service.tsx';


function GameComponent () {
    const [dailyLetters, setDailyLetters] = useState<string[]>([]);
    const [guess, setGuess] = useState('');


    async function fetchDailyLetters () {
        try {
            const letters = await getDailyList();
            if (letters) {
                return letters.letters;
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
        setGuess(event.target.value)
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault();
        setGuess(`${guess}${event.target.value }`)
    }



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
                </form>
            </div>


        </>
    )
}

export default GameComponent
