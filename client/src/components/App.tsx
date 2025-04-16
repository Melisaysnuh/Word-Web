import '../styles/App.css'
import GameComponent from './game-component'
import WordListComponent from './word-list-component'
import RegisterComponent from './register-component'
import LoginComponent from './login-component'
import UserComponent from './user-component'
import { AuthContext } from '../context/auth-context'
import { logout, isTokenExpired } from '../services/auth-service'
import { useContext, useEffect, useState } from 'react'




function App () {
  const { user, setUser } = useContext(AuthContext);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [registerModal, setRegisterModal] = useState<boolean>(false);
  const [userModal, setUserModal] = useState<boolean>(false);

  useEffect(() => {
    if (!user || isTokenExpired()) {
      handleLogOut();
      setLoginModal(true);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {registerModal && <RegisterComponent
      setRegisterModal={setRegisterModal}

 />}
      {userModal && <UserComponent
      setUserModal={setUserModal}

 />}
      {loginModal && <LoginComponent
      setLoginModal={setLoginModal}
/>}  <div className='main-container'>
        <nav className='navigation'><img src='/logo.svg' alt='word-web-logo' />
          {user ? <div onClick={handleUserToggle}>Hello, {user.firstName} <button
            className='other-button' data-testid='logOut' onClick={handleLogOut}>Log Out</button></div> : <div className='user-panel'><button className='other-button' data-testid='logIn'
            onClick={handleLoginClick}>Log in</button><button
                className='other-button' data-testid='register' onClick={handleRegisterClick}>Register</button>
          </div>}
              </nav>
        <div className='subhead'>
          <GameComponent

          />
          <WordListComponent
/>

        </div>
      </div>

    </>

  )
}


export default App
