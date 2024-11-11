import './word-list-component.css';
import { useState } from 'react';



function WordListComponent () {
    const [guessedWords, setGuessedWords] = useState(['hello', 'goodbye', 'here', 'there', 'every', 'thing', 'is', 'progressing'])

    function addToList(word: string) {
        setGuessedWords([...guessedWords, word])
    }
addToList('hello again');
    return (
        <>

            <div id='word-list-container' className='block'>
                <div id='progress-bar-container'>
                    <svg id='spider' height="450" width="50">
                        <polyline className="dotted-line" points="20,8 20,58 20,108 20,158 20,208 20,258 20, 308 20, 358 20, 408" />
                        <marker id="circle-marker" markerWidth="6" markerHeight="6" refX="3" refY="3">
                            <circle className="foreground" cx="3" cy="3" r="2" />
                        </marker>
                    </svg>

                </div>
                <div id='word-list'>

                    <ul>
                       {
                        guessedWords.map((word) => (
                            <li
                            key={Math.floor(Math.random() * 1000)}>{word}</li>
                        )

                        )

                       }
                    </ul>

                </div>
            </div>

        </>
    )
}

export default WordListComponent
