import '../styles/App.css'
import GameComponent from './game-component'
import WordListComponent from './word-list-component'
import { useState } from 'react'
import WordObj from '../types/WordObj'



function App () {
  const [guessedWords, setGuessedWords] = useState<WordObj[]>([]);
  const [totalPoints, setTotalPoints] =useState<number>(0);


  return (

      <div className='main-container'>
        <nav className='navigation'><img src='/logo.svg' alt='word-web-logo' /></nav>
        <div className='subhead'>
          <GameComponent
          guessedWords={guessedWords}
          setGuessedWords={setGuessedWords}
          setTotalPoints={setTotalPoints}
          totalPoints={totalPoints}

          />
          <WordListComponent
          guessedWords={guessedWords}
          totalPoints = {totalPoints}/>

        </div>
      </div>

  )
}


export default App
