import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeContext } from 'contexts'
import mangarelTheme from 'theme'
import { FirebaseApp } from 'FirebaseApp'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Router>
    <React.StrictMode>
      <FirebaseApp>
        <ThemeContext.Provider value={mangarelTheme}>
          <App />
        </ThemeContext.Provider>
      </FirebaseApp>
    </React.StrictMode>
  </Router>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
