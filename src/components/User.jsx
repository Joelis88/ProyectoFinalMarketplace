import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate } from "react-router-dom"


const User = ({ children }) => {
    const { token } = useContext(UserContext)
  return token ? <Navigate to="/" /> : children
}
  


export default User