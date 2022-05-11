import { useBooks } from 'hooks/use-books'
import { Calendar } from './Calendar'

export const CalendarContaienr: React.FC = () => {
  const { books, loading } = useBooks()

  return <Calendar books={books} loading={loading} />
}
