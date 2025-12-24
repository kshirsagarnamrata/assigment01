import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Orderd from './pages/orderd';

// functional components
function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orderd />} />
      </Routes>
    </>
  )
}

export default App
