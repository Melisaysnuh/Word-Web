import '../styles/App.css'
import GameComponent from './game-component'
import WordListComponent from './word-list-component'
import RegisterComponent from './register-component'
import LoginComponent from './login-component'
import UserComponent from './user-component'
import { logout, isTokenExpired } from '../services/auth-service'
import {  useEffect, useState } from 'react'
import WordObj from '../types/WordObj'
import { UserI } from '../types/User'




function App () {
  const [ user, setUser ] = useState<UserI | null>(null);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [registerModal, setRegisterModal] = useState<boolean>(false);
  const [userModal, setUserModal] = useState<boolean>(false);
      const [localGuessedWords, setLocalGuessedWords] = useState<WordObj[]>([]);
      const [localPoints, setLocalPoints] = useState(0);

  useEffect(() => {
    if (!user || isTokenExpired()) {
      handleLogOut();
      setLoginModal(true);
      }
  }, [user]);

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
  const handleUserToggle =()=> {
    setUserModal(!userModal)
  }

  return (
    <>
      {registerModal && <RegisterComponent setUser={setUser}
      setRegisterModal={setRegisterModal}

 />}
      {userModal && <UserComponent user={user}
      setUserModal={setUserModal}

 />}
      {loginModal && <LoginComponent setUser={setUser}
      setLoginModal={setLoginModal}
/>}  <div className='main-container'>
        <nav className='navigation'><img id="logo" src='/logo.svg' alt='word-web-logo' />
          {user ? <div onClick={handleUserToggle}>Hello, {user.firstName} <button
            className='other-button' data-testid='logOut' onClick={handleLogOut}>Log Out</button></div> : <div className='user-panel'><button className='other-button' data-testid='logIn'
            onClick={handleLoginClick}>Log in</button><button
                className='other-button' data-testid='register' onClick={handleRegisterClick}>Register</button>
          </div>}
              </nav>
        <div className='subhead'>
          <GameComponent
          localGuessedWords={localGuessedWords} setLocalGuessedWords={setLocalGuessedWords} localPoints={localPoints} setLocalPoints={setLocalPoints} user={user}
          />
          <WordListComponent localGuessedWords={localGuessedWords}  localPoints={localPoints}
/>

        </div>
      </div>

    </>

  )
}


export default App
