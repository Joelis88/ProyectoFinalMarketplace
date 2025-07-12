import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { Children, useState, useContext } from 'react'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Account from './pages/Account'
import Profile from './pages/Profile'
import Post from './pages/Post'
import ProductView from './pages/ProductView'
import Women from './pages/categories/Women'
import Men from './pages/categories/Men'
import PageChildren from './pages/categories/PageChildren'
import Accessories from './pages/categories/Accessories'
import Favorites from './pages/Favorites'
import MyPosts from './pages/MyPosts'
import PageNotifications from './pages/PageNotifications'
import { UserContext } from "./context/UserContext"

function App() {
   const [busqueda, setBusqueda] = useState("");
   const {isAuthenticated} = useContext(UserContext) 

  return (
    <>
      <NavBar  busqueda={busqueda} setBusqueda={setBusqueda} />
      <Routes>
        <Route path='/' element={<Home busqueda={busqueda}/>}/>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to='/profile' />} />  
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to='/' />} />
        <Route path="/profile" element={isAuthenticated ? <Account /> : <Navigate to='/login' />} />
        <Route path="/profileEdit" element={isAuthenticated ? <Profile /> : <Navigate to='/login' />} />
        <Route path="/profile/publicarArticulo" element={isAuthenticated ? <Post /> : <Navigate to='/login' />} />
        <Route path="/mujer" element={<ProtectedRoute><Women /></ProtectedRoute>} />
        <Route path="/hombre" element={<ProtectedRoute><Men /></ProtectedRoute>} />
        <Route path="/niños" element={<ProtectedRoute><PageChildren /></ProtectedRoute>} />
        <Route path="/accesorios" element={<ProtectedRoute><Accessories /></ProtectedRoute>} />
        <Route path="/producto/:id" element={<ProductView />} />
        <Route path="/favoritos" element={isAuthenticated ? <Favorites /> : <Navigate to='/login' />} />
        <Route path="/publicaciones" element={isAuthenticated ? <MyPosts /> : <Navigate to='/login' /> } />
        <Route path="/interesados" element={isAuthenticated ? <PageNotifications /> : <Navigate to='/login' />} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer />  
    </>
  )
}

export default App
