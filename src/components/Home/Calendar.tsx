import { Book } from 'services/mangarel/models/book'

type CalendarProps = {
  books: Book[]
  loading?: boolean
}

export const Calendar: React.FC<CalendarProps> = ({ books }) => {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.title}>{book.title}</li>
      ))}
    </ul>
  )
}
