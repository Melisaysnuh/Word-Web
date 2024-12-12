import '../styles/App.css'
import GameComponent from './game-component'
import WordListComponent from './word-list-component'
import { useState } from 'react'
import WordObj from '../types/WordObj'
import RegisterComponent from './register-component'
import LoginComponent from './login-component'
import { UserI } from '../types/User'
import { logout } from '../services/authService'




function App () {
  const [guessedWords, setGuessedWords] = useState<WordObj[]>([]);
  const [totalPoints, setTotalPoints] =useState<number>(0);
  const [loginModal, setLoginModal]= useState<boolean>(false);
  const [registerModal, setRegisterModal] = useState<boolean>(false);
  const [user, setUser] = useState<UserI | null>();

  const handleLoginClick = () => {
    setLoginModal(true)
  }
  const handleRegisterClick = () => {
    setRegisterModal(true)
  }
  const handleLogOut = () => {
    logout();
    setUser(null)

  }

  return (
    <>
      {registerModal && <RegisterComponent
      setRegisterModal={setRegisterModal}

        setUser={setUser} />}
      {loginModal && <LoginComponent
      setLoginModal={setLoginModal}

      setUser={setUser}/>}  <div className='main-container'>
        <nav className='navigation'><img src='/logo.svg' alt='word-web-logo' />
          {user ? <div>Hello, {user.firstName} <button
            className='other-button' onClick={handleLogOut}>Log Out</button></div> : <div className='user-panel'><button className='other-button'
            onClick={handleLoginClick}>Log in</button><button
              className='other-button' onClick={handleRegisterClick}>Register</button>
          </div>}
              </nav>
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
