import { firebaseConfig } from 'firebase-config'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseApp = initializeApp(firebaseConfig)
export const firebaseFirestore = getFirestore(firebaseApp)
