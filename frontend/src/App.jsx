import './App.css'
import { useState } from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext' 

function App() {
  const [count, setCount] = useState(0)
  const {authUser} = useAuthContext()
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authUser?<Home/>:<Navigate to='/login'/>} />
        <Route path='/login' element={authUser?<Navigate to='/'/>:<Login />} />
        <Route path='/signup' element={authUser?<Navigate to='/'/>:<SignUp />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
