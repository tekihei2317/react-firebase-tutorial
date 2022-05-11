import { Book } from 'services/mangarel/models/book'
import { Calendar } from './Calendar'

export const CalendarContaienr: React.FC = () => {
  const books = [] as Book[]
  const loading = false

  return <Calendar books={books} loading={loading} />
}
