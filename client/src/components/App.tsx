import './App.css'
import GameComponent from './game-component'
import WordListComponent from './word-list-component'
import { useState } from 'react'




function App () {
  const [guessedWords, setGuessedWords] = useState<{ word: string, points: number, pangram: boolean }[]>([]);


  return (
    <>
      <div id='main-container'>
        <nav id='navigation'><img src='/logo.svg' alt='logo' /></nav>
        <div id='subhead'>
          <GameComponent guessedWords={guessedWords} setGuessedWords={setGuessedWords}></GameComponent>
          <WordListComponent guessedWords={guessedWords}></WordListComponent>
        </div>
      </div>
    </>
  )
}


export default App
