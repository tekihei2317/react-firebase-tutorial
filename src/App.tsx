import React, { useContext } from 'react'
import logo from './logo.svg'
import './App.css'
import { FirebaseContext, ThemeContext } from 'contexts'

function App() {
  const theme = useContext(ThemeContext)
  console.log(theme)
  const db = useContext(FirebaseContext)
  console.log(db)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
