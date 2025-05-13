import '../styles/App.css'
import GameComponent from './game-component'
import WordListComponent from './word-list-component'
import RegisterComponent from './register-component'
import LoginComponent from './login-component'
import UserComponent from './user-component'
import { logout, isTokenExpired } from '../services/auth-service'
import {  useEffect, useState } from 'react'
import { HistoryI, UserI } from '../types/User'
import { format} from 'date-fns';




function App () {
  const [ user, setUser ] = useState<UserI | null>(null);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [registerModal, setRegisterModal] = useState<boolean>(false);
  const [userModal, setUserModal] = useState<boolean>(false);
  const [todayHistory, setTodayHistory] = useState<null | HistoryI>(null);

  useEffect(() => {
    const todayId = format(new Date(), "yyyy_MM_dd");
    const blankHistory = {
      daylist_id: todayId,
      guessedWords: [],
      totalUserPoints: 0,
      level: 'Daddy Long-Legs'
    }
    if (!user || isTokenExpired()) {
      handleLogOut();
      setLoginModal(true);
      setTodayHistory(blankHistory)
      }
      else {
        if (user.history) {
          const existing: HistoryI | undefined = user.history.find(h => h.daylist_id === todayId);
          if (!existing || existing === undefined) {
            const updatedUser = {
              ...user,
              history: [...user.history, blankHistory]
            };
            setUser(updatedUser);
            setTodayHistory(blankHistory)
          }
          else  {
            const existing = user.history.find(h => h.daylist_id === todayId);
            const today = existing as HistoryI
            setTodayHistory(today);
          }


      }
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
      {userModal && <UserComponent user={user} todayHistory={todayHistory}
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
          <GameComponent  todayHistory={todayHistory} setTodayHistory={setTodayHistory}
          setUser={setUser}
          />
          <WordListComponent todayHistory={todayHistory} setUser={setUser}
/>

        </div>
      </div>

    </>

  )
}


export default App
