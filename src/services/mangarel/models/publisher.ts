import { Timestamp } from 'firebase/firestore'

export type Publisher = {
  id?: string
  name: string
  nameReading: string | null
  website: string | null
  createdAt: Timestamp | null
  updatedAt: Timestamp | null
}
