import { Route, Routes } from 'react-router'
import './App.css'
import { paths } from 'paths'
import { Home } from 'components/Home'

function App() {
  return (
    <div>
      <Routes>
        <Route path={paths.home} element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
