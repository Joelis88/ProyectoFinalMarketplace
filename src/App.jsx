import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { Children, useState } from 'react'
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
        <Route path="/profileEdit" element={<Profile />} />
         <Route path="/profile/publicarArticulo" element={<Post />} />
          <Route path="/mujer" element={<Women />} />
          <Route path="/hombre" element={<Men />} />
          <Route path="/niños" element={<PageChildren/>} />
            <Route path="/accesorios" element={<Accessories/>} />
         <Route path="/producto/:id" element={<ProductView />} />
         <Route path="/favoritos" element={<Favorites />} />
           <Route path="/publicaciones" element={<MyPosts />} />
           <Route path="/interesados" element={<PageNotifications />} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
       <Footer />  
    </>
  )
}

export default App
