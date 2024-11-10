import './App.css'
import GameComponent from './game-component'
import WordListComponent from './word-list-component'

function App () {


  return (
    <>
      <div id='main-container'>
        <nav id='navigation'><img src='/logo.svg' alt='logo' /></nav>
        <div id='subhead'>
          <GameComponent></GameComponent>
        <WordListComponent></WordListComponent>
        </div>
      </div>
    </>
  )
}

export default App
