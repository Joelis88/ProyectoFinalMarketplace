import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(UserContext);

  if (loading) return <div>Cargando...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};


export default ProtectedRoute