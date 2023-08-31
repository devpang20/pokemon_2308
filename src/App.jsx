import { Route, Routes, Navigate } from "react-router-dom"
import PokeListPage from "./components/PokeListPage"
import PokeDetailPage from "./components/PokeDetailPage"
import NotFoundPage from "./components/NotFoundPage"

function App() {
  return (
    <Routes>
      <Route index element={<PokeListPage />} />
      <Route path="/pokes" element={<PokeListPage/>} />
      <Route path="/pokes/:id" element={<PokeDetailPage/>} />
      {/* <Route path="/" element={<NotFoundPage/>} /> */}
    </Routes>
  )
}

export default App
