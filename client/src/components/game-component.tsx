import '../styles/game-component.css';
import React, { useState, useEffect, useContext } from 'react';
import { getDailyList } from '../services/list-service';
import { checkWord } from '../services/submit-service';
import WordObj from '../types/WordObj';
import { generateRandomIndices } from '../utilities/shuffle-utility';
import { calculatePoints } from '../utilities/points-utility';
import { AuthContext } from '../context/UserContext';
import { format } from 'date-fns';
const now = format(new Date(), "yyyy_MM_dd");
import { HistoryI } from '../types/User';
import SubmitWordResponse from '../types/SubmitWordResponse';


function GameComponent () {
    const [dailyLetters, setDailyLetters] = useState<string[]>([]);
    const [date] = useState<string>(now)
    const [guess, setGuess] = useState('');
    const [formStatus, setFormStatus] = useState({ success: 'none', message: '' });

    const { user, guessedWords, setGuessedWords, totalPoints, setTotalPoints } = useContext(AuthContext);

    async function fetchDailyList () {
        try {
            const data = await getDailyList()
            if (data) {
                const list = data.list;

                return list;
            } else console.log('you are not yet fetching your info')
        }
        catch (e) {
            console.log('error in fetchDaily in game component:', e)
        }
    }

    const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const guess = event.target.value.toLowerCase()
        const lastKey = guess[guess.length-1]
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



    const handleClick = (event: React.MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault();
        const target = event.target as HTMLButtonElement;
        setGuess(`${guess}${target.value.toUpperCase()}`)
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
        else if (!word.includes(dailyLetters[0].toUpperCase())) {
            setFormStatus({ success: 'fail', message: 'Word must contain center letter.' });
        }
            else {
            const res: SubmitWordResponse | {error: string} | undefined  = await checkWord(word);
               if ( res !== undefined && 'history' in res) {
                const userHistory: HistoryI[] | undefined = res.history;
                if (userHistory !== undefined){
                const todayHistory: HistoryI = userHistory.filter(h  => h.daylist_id === date)[0];
                if (todayHistory && todayHistory.guessedWords) {
                    // todayHistory.guessedWords is likely an array of objects, which may or may not match your WordObj type
                    // Adjust as necessary to match your expected structure.
                    setGuessedWords(todayHistory.guessedWords);
                }}
                if (res.valid === true) {
                    const resWord = res.guessedWord as WordObj;
                    if (resWord) {

                        setGuessedWords([...guessedWords, resWord]);
                        setFormStatus({ success: 'pass', message: resWord.word + ' is a valid word!.' });
                    }
                }
                else {
                    console.log('word was not valide!');
                    setFormStatus({ success: 'fail', message: `${word} is not valid` });
                }
            }



        }
        setGuess('');
    }




    useEffect(() => {
        async function fetchShuffle () {
            const list = await fetchDailyList();
            const letters = list.letters;
            const allWords = list.validWords;
            const shuffled = generateRandomIndices(letters);
            setDailyLetters(shuffled);
            setGuess('');
            setFormStatus({ success: 'none', message: '' });
            setTotalPoints(calculatePoints(allWords));
        }
        fetchShuffle();
    }, [setTotalPoints]);



    return (
        <>

            <div id='game-container' className='block'>

                <img id='spiderweb' src='/spiderweb.svg' />

                <form className="letter-form" >
                    <div className='message'><div className={formStatus.success}>{formStatus.message}</div></div>
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
