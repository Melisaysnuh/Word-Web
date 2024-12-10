import '../styles/App.css'
import GameComponent from './game-component'
import WordListComponent from './word-list-component'
import { useState } from 'react'
import WordObj from '../types/WordObj'
import RegisterComponent from './register-component'
import LoginComponent from './login-component'



function App () {
  const [guessedWords, setGuessedWords] = useState<WordObj[]>([]);
  const [totalPoints, setTotalPoints] =useState<number>(0);
  const [loginModal, setLoginModal]= useState<boolean>(false);
  const [registerModal, setRegisterModal] = useState<boolean>(false)

  const handleLoginClick = () => {
    setLoginModal(true)
  }
  const handleRegisterClick = () => {
    setRegisterModal(true)
  }

  return (
    <>
      {registerModal && <RegisterComponent />}
      {loginModal && <LoginComponent />} <div className='main-container'>
        <nav className='navigation'><img src='/logo.svg' alt='word-web-logo' /><div><button onClick={handleLoginClick}>Log in</button><button onClick={handleRegisterClick}>Register</button></div> </nav>
        <div className='subhead'>
          <GameComponent
            guessedWords={guessedWords}
            setGuessedWords={setGuessedWords}
            setTotalPoints={setTotalPoints}
            totalPoints={totalPoints}

          />
          <WordListComponent
            guessedWords={guessedWords}
            totalPoints={totalPoints} />

        </div>
      </div>

    </>

  )
}


export default App
