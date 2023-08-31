import { Route, Routes, Navigate } from "react-router-dom"
import PokeListPage from "./components/PokeListPage"

function App() {
  return (
    <Routes>
      <Route index path="/" element={<PokeListPage />} />
      <Route path="/poke/list" element={<PokeListPage/>} />
      <Route path="*" element={<Navigate to="/poke/list" />} />
    </Routes>
  )
}

export default App
