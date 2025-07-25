import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(UserContext)
  return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoute