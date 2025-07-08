import { createContext, useState, useEffect } from "react"

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "fake-token") // simulado
  const [email, setEmail] = useState(localStorage.getItem("email") || "juan@ejemplo.com")
  const [user, setUser] = useState({
    id: 1,
    nombre: "Juan Pérez",
    email: "juan@ejemplo.com",
    ciudad: "Concepción",
    telefono: 912345678,
    imagen: null,
  })

  /* autenticación - true: usuario autenticado, false: usuario sin autenticar*/
  const [isAuthenticated, setisAuthenticated] = useState(true)
  /* ESTADO DE LOS ERRORES */
  const [errorMessage, setErrorMessage] = useState('')    

  // Función para obtener perfil (simulada)
  const getProfile = async () => {
    if (!token) return
    try {
      // Simulamos una respuesta exitosa
      const userData = {
        id: 1,
        nombre: "Juan Pérez",
        email: "juan@ejemplo.com",
        ciudad: "Concepción",
        telefono: 912345678,
        imagen: null,
      }
      setUser(userData)
    } catch (error) {
      console.error("Error al obtener el perfil:", error.message)
      setUser(null)
    }
  }

  // Cargar perfil automáticamente si hay token
  useEffect(() => {
    if (token) {
      getProfile()
    }
  }, [token])

  // Función login (simulada porq no tenemos backend todavia)
  const login = async (email, password) => {
    try {
     
      const fakeToken = "fake-token-123"
      const fakeUser = {
        id: 1,
        nombre: "Juan",
        email,
        imagen: null,
      }

      setToken(fakeToken)
      setEmail(email)
      setUser(fakeUser)

      localStorage.setItem("token", fakeToken)
      localStorage.setItem("email", email)
    } catch (error) {
      console.error("Error en login:", error.message)
      alert(error.message)
    }
  }

  // Función registro (simulada)
  const register = async (email, password) => {
    try {
      alert("Registro simulado exitoso. Ahora inicia sesión.")
    } catch (error) {
      console.error("Error en registro:", error.message)
      alert(error.message)
    }
  }

  // Función logout
  const logout = () => {
    setisAuthenticated(false)
    localStorage.removeItem("token")
    user.email = ''
    user.password = ''
  }

  return (
    <UserContext.Provider
      value={{ 
                token,
                email,
                user,
                setUser,
                login,
                register,
                logout,
                getProfile,
                isAuthenticated,
                setisAuthenticated,
                errorMessage,
                setErrorMessage
            }}>
                {children}
    </UserContext.Provider>
  )
}

export default UserProvider

