import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import UsersPage from './components/UsersPage'

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/usuarios" element={<UsersPage />} />
  </Routes>
)

export default App