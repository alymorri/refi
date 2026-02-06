import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Quiz from './pages/Quiz'
import Loading from './pages/Loading'
import Congratulations from './pages/Congratulations'
import Form from './pages/Form'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/congratulations" element={<Congratulations />} />
      <Route path="/form" element={<Form />} />
    </Routes>
  )
}
