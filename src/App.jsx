import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Loading from './pages/Loading'
import Congratulations from './pages/Congratulations'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/congratulations" element={<Congratulations />} />
    </Routes>
  )
}
