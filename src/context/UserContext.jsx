import { createContext, useState, useEffect } from "react"

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const [email, setEmail] = useState(null)  // guarda email 
  const [user, setUser] = useState(null)  // guarda perfil  

  // Función para perfil
  const getProfile = async () => {
    if (!token) return

    try {
      const response = await fetch("", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("No se pudo obtener el perfil")
      }

      const userData = await response.json()
      setUser(userData) // Guarda los datos del usuario en el estado
    } catch (error) {
      console.error("Error al obtener el perfil:", error.message)
      setUser(null)
    }
  }

  // Llama a getProfile cuando cambie el token
  useEffect(() => {
    if (token) {
      getProfile()
    }
  }, [])


  // Función login
  const login = async (email, password) => {
    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("email o contraseña incorrecta")
      }

      const data = await response.json()
      setToken(data.token)
      setEmail(data.email)
      localStorage.setItem("token", data.token)  // Guarda el token en el localStorage
      localStorage.setItem("email", data.email)  // Guarda el email en el localStorage
    } catch (error) {
      console.error("Error en login:", error.message)
      alert(error.message)
    }
  }

  // Función registro
  const register = async (email, password) => {
    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("No se pudo registrar el usuario")
      }
  
      alert("Registro exitoso. Ahora inicia sesión.")
  
    } catch (error) {
      console.error("Error en registro:", error.message)
      alert(error.message)
    }
  }

  // Función logout
  const logout = () => {
    setToken(null)
    setEmail(null)
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("email")
  }

  return (
    <UserContext.Provider value={{ token, email, user, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
