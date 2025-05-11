import '../styles/game-component.css';
import React, { useState, useEffect, useRef } from 'react';
import { getDailyListService } from '../services/list-service';
import { checkWord } from '../services/submit-service';
import WordObj from '../types/WordObj';
import SubmitWordResponse from '../types/SubmitWordResponse';
import { HistoryI, UserI } from '../types/User';
import Daylist from '../types/Daylist';
import { generateRandomIndices } from '../utilities/shuffle-utility';

interface GameComponentProps {
    setLocalGuessedWords: React.Dispatch<React.SetStateAction<WordObj[]>>;
    localGuessedWords: WordObj[];
    localPoints: number;
    setLocalPoints: React.Dispatch<React.SetStateAction<number>>;
    user: UserI | null;
    setUser: React.Dispatch<React.SetStateAction<UserI | null>>;
}
const GameComponent: React.FC<GameComponentProps> = ({setLocalGuessedWords, localGuessedWords, setLocalPoints, localPoints, user, setUser}) => {
    const [dailyLetters, setDailyLetters] = useState<string[]>([]);
    const [guess, setGuess] = useState('');
    const [formStatus, setFormStatus] = useState({ success: 'none', message: '' });
    const [ history, setHistory ] = useState<HistoryI>();
    const inputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (history && history.guessedWords) {
            // User is logged in, sync local state with user history
            setLocalGuessedWords(history.guessedWords);
            setLocalPoints(history.totalUserPoints);
        } else {
            // No user — try to load from localStorage (if using)
            const savedWords = JSON.parse(localStorage.getItem('localGuessedWords') || '[]');
            const savedPoints = parseInt(localStorage.getItem('localPoints') || '0', 10);
            setLocalGuessedWords(savedWords);
            setLocalPoints(savedPoints);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history]);


    // reload for non users
    useEffect(() => {
        if (!history) {
            localStorage.setItem('localGuessedWords', JSON.stringify(localGuessedWords));
            localStorage.setItem('localPoints', localPoints.toString());
        }
    }, [localGuessedWords, localPoints, history]);



    async function fetchDailyList () {
        try {
            const data = await getDailyListService();
            console.log('data is', data)

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

    // * THE BIG ONE

    async function handleSubmit (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) {
        event.preventDefault();
        const word = guess;

        if (word.length < 4) {
            setFormStatus({ success: 'fail', message: 'Words must be at least four letters.' });
        } else if (localGuessedWords && localGuessedWords?.some((element: WordObj) => element.word.toUpperCase() === word) ||history && history.guessedWords && history.guessedWords.some((element: WordObj) => element.word.toUpperCase() === word)) {
            console.warn('word found already')
            setFormStatus({ success: 'fail', message: 'Word already found.' });
        } else if (!word.includes(dailyLetters[0].toUpperCase())) {
            setFormStatus({ success: 'fail', message: 'Word must contain center letter.' });
        } else {
            const res: SubmitWordResponse | undefined = await checkWord(word);
            console.log('res is')

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
                            console.log('updating')
                            setLocalGuessedWords(updatedGuessedWords);
                            setLocalPoints(updatedPoints);

                            setFormStatus({ success: 'pass', message: `${resWord.word} is a valid word, ${user?.firstName}!` });
                        }
                        else {
                            console.log('no user found')
                            const updatedGuessedWords = [...localGuessedWords, resWord];
                            setLocalGuessedWords(updatedGuessedWords);

                            const updatedPoints = localPoints + (resWord.points || 0);
                            setLocalPoints(updatedPoints);
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
