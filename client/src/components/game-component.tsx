import './game-component.css';
import React, { useState, useEffect } from 'react';

function GameComponent () {
    const [dailyLetters, setDailyLetters] = useState<string[]>([]);


    const generateRandomIndices = (letters: string[]) => {
        const remainingLetters = letters.slice(1);
        const shuffled = [letters[0]]


        while (remainingLetters.length) {
            const randomIndex = Math.floor(Math.random() * remainingLetters.length);
            shuffled.push(remainingLetters.splice(randomIndex, 1)[0]);
        }

        return shuffled;
    };

    /*     const updateState = (list) => {
            setDailyLetters((letters) => {
                const todaysLetters = letters;
               return todaysLetters;)
                return newMovies;
            });
        };*/

    useEffect(() => {
        const letters = ['P', 'O', 'R', 'T', 'R', 'A', 'Y'];
        const shuffled = generateRandomIndices(letters);
        setDailyLetters(shuffled);
    }, []);


    return (
        <>

            <div id='game-container' className='block'>

                <img id='spiderweb' src='/spiderweb.svg' />

                <form id="letter-form" >
                    <input type='text' id='text-input'></input>
                    <div className='gameholder'>
                        {
                            dailyLetters.map(
                                (letter, index) => (
                                    <button
                                        key={index}
                                        id={`pos${index + 1}`}
                                        className='hex-button'
                                    >{letter}</button>
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
