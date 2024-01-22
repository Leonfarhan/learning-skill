import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'  
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Class from './pages/Class'
import Threads from './pages/Threads'
import Account from './pages/Account'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/class" element={<Class />} />
        <Route path="/threads" element={<Threads />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  )
}