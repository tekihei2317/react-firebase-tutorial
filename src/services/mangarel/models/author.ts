import { Timestamp } from 'firebase/firestore'

export type Author = {
  id?: string
  name: string
  nameReading: string | null
  variation: string
  createdAt: Timestamp | null
  updatedAt: Timestamp | null
}

export const blankAuthor: Author = {
  name: '',
  nameReading: null,
  variation: '',
  createdAt: null,
  updatedAt: null,
}
