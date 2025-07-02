import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(UserContext)
  return token ? children : <Navigate to="/login" />
}

export default ProtectedRoute