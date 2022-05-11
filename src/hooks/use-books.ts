import { useEffect, useState } from 'react'
import { Book } from 'services/mangarel/models/book'
import { query, limit, collection, getDocs } from 'firebase/firestore'
import { collectionName } from 'services/mangarel/constants'
import { firebaseFirestore as db } from '../firebase'

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const loadData = async () => {
    setLoading(true)

    try {
      // 楽天APIからbooksを取得していないため、feedMemosで代用
      const booksRef = collection(db, collectionName.feedMemos)
      const querySnapshot = await getDocs(query(booksRef, limit(10)))

      const booksData = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Book),
        id: doc.id,
      }))

      setBooks(booksData)
      setError(null)
    } catch (error) {
      setError(error as Error)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return { books, loading, error }
}
