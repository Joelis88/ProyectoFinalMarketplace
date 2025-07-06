import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { useState } from 'react'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Account from './pages/Account'
import Profile from './pages/Profile'
import Post from './pages/Post'









function App() {
   const [busqueda, setBusqueda] = useState("");
 

  return (
    <>
      

      <NavBar  busqueda={busqueda} setBusqueda={setBusqueda} />
      <Routes>
        <Route path='/' element={<Home busqueda={busqueda}/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/profile/edit" element={<Profile />} />
         <Route path="/publicar" element={<Post />} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
       <Footer />
  
    </>
  )
}

export default App
