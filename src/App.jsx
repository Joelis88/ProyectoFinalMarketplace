import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Account from './pages/Account'
import Profile from './pages/Profile'









function App() {
  
 

  return (
    <>
      

      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/profile" element={<Profile />} />

        
        {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}

        <Route path='*' element={<NotFound/>}/>
      </Routes>
       <Footer />
  
    </>
  )
}

export default App
