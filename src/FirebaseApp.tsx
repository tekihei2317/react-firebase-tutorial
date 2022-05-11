import React, { FC } from 'react'
import { firebaseFirestore as db } from './firebase'
import { FirebaseContext } from 'contexts'

type Prop = {
  children: React.ReactNode
}

export const FirebaseApp: FC<Prop> = ({ children }) => {
  return <FirebaseContext.Provider value={{ db }}>{children}</FirebaseContext.Provider>
}
