import { createContext } from 'react'
import mangarelTheme from 'theme'
import { Firestore } from 'firebase/firestore'

type FirebaseContextValue = {
  db: Firestore | null
}

export const FirebaseContext = createContext<FirebaseContextValue>({
  db: null,
})

export const ThemeContext = createContext(null as unknown as typeof mangarelTheme)
