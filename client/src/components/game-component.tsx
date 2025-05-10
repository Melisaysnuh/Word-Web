import '../styles/game-component.css';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { getDailyListService } from '../services/list-service';
import { checkWord } from '../services/submit-service';
import WordObj from '../types/WordObj';
import { AuthContext } from '../context/auth-context';
import SubmitWordResponse from '../types/SubmitWordResponse';
import { HistoryI } from '../types/User';
import Daylist from '../types/Daylist';
import { generateRandomIndices } from '../utilities/shuffle-utility';


function GameComponent () {
    const [dailyLetters, setDailyLetters] = useState<string[]>([]);
    const [guess, setGuess] = useState('');
    const [formStatus, setFormStatus] = useState({ success: 'none', message: '' });

    const { setUser, history, setHistory } = useContext(AuthContext);
    const inputRef = useRef<HTMLInputElement>(null);


    async function fetchDailyList () {
        try {
            const data = await getDailyListService()

            if (data) {
                const list: Daylist = data.list;
                return list;
            } else console.error('you are not yet fetching your info');
            return null;
        }
        catch (e) {
            console.error('error in fetchDaily in game component:', e);
            return null
        }
    }

    const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const guess = event.target.value.toLowerCase()
        const lastKey = guess[guess.length - 1]
        setGuess(event.target.value.toUpperCase());
        if (dailyLetters.includes(lastKey)) {
            const button = document.querySelector(`button[value="${lastKey}"]`);
            if (button) {
                button.classList.add('flash');
                setTimeout(() => {
                    button.classList.remove('flash');
                }, 200);
            }
        }
    }



    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const target = event.target as HTMLButtonElement;
        target.classList.add('flash');
        setTimeout(() => {
            target.classList.remove('flash');
        }, 200);
        setGuess(`${guess}${target.value.toUpperCase()}`)
    }
    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setGuess('');
        setFormStatus({ success: 'none', message: '' });

    }
    const handleShuffle = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        const shuffled = generateRandomIndices(dailyLetters);
        setDailyLetters(shuffled);
        setFormStatus({ success: 'none', message: '' });
        inputRef.current?.focus();

    }

    async function handleSubmit (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) {
        event.preventDefault();
        const word = guess;

        if (word.length < 4) {
            setFormStatus({ success: 'fail', message: 'Words must be at least four letters.' });
        } else if (history && history.guessedWords.some((element: WordObj) => element.word.toUpperCase() === word)) {
            setFormStatus({ success: 'fail', message: 'Word already found.' });
        } else if (!word.includes(dailyLetters[0].toUpperCase())) {
            setFormStatus({ success: 'fail', message: 'Word must contain center letter.' });
        } else {
            const res: SubmitWordResponse | undefined = await checkWord(word);

            if (res !== undefined) {
                if (res.valid && res.valid === true) {
                    const resWord = res.guessedWord as WordObj;
                    if (resWord) {

                        if (history) {
                            const updatedGuessedWords = [...history.guessedWords, resWord];
                            const updatedPoints = history.totalUserPoints + (resWord.points || 0);
                            const updatedHistory: HistoryI = {
                                ...history,
                                guessedWords: updatedGuessedWords,
                                totalUserPoints: updatedPoints,
                            };

                            setHistory(updatedHistory);


                            setUser((prevUser) => {
                                if (!prevUser || !prevUser.history) return prevUser;


                                const updatedUserHistory = [updatedHistory, ...prevUser.history.slice(1)];
                                return { ...prevUser, history: updatedUserHistory };
                            });


                            setFormStatus({ success: 'pass', message: `${resWord.word} is a valid word!` });
                        }
                    }
                } else {
                    setFormStatus({ success: 'fail', message: `${guess} is not valid` });
                }
            }
        }

        setGuess('');
        inputRef.current?.focus();
    }


    useEffect(() => {
        async function fetchShuffle () {

            const list = await fetchDailyList();
            if (list && list.letters) {
                const letters = list ? list.letters : [];
                const shuffled = generateRandomIndices(letters);
                setDailyLetters(shuffled);
                setGuess('');
                setFormStatus({ success: 'none', message: '' });

            }
        }
        fetchShuffle();
        inputRef.current?.focus();

    }, []);



    return (
        <>

            <div id='game-container' className='block'>

                <img id='spiderweb' src='/spiderweb.svg' />

                <form className="letter-form" >
                    <div className='message'><div className={formStatus.success}>{formStatus.message}</div></div>
                    <input type='text'
                        aria-label='text input field'
                        className='text-input'
                        value={guess}
                        ref={inputRef}
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
                        <span className="material-symbols-outlined" onClick={handleShuffle}>
                            refresh
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
