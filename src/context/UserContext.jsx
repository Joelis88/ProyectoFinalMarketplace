import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [errorMessage, setErrorMessage] = useState("");

  // Simulación de obtener el perfil
  const getProfile = async () => {
    if (!token) return;
    try {
      const userData = {
        id: 1,
        nombre: "Juan Pérez",
        email,
        ciudad: "Concepción",
        telefono: 912345678,
        imagen: null,
      };
      setUser(userData);
    } catch (error) {
      console.error("Error al obtener el perfil:", error.message);
      setUser(null);
    }
  };

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const fakeToken = "fake-token-123";
      const fakeUser = {
        id: 1,
        nombre: "Juan Pérez",
        email,
        ciudad: "Concepción",
        telefono: 912345678,
        imagen: null,
      };

      setToken(fakeToken);
      setEmail(email);
      setUser(fakeUser);
      setIsAuthenticated(true);

      localStorage.setItem("token", fakeToken);
      localStorage.setItem("email", email);
    } catch (error) {
      console.error("Error en login:", error.message);
      alert(error.message);
    }
  };

  const register = async (email, password) => {
    try {
      alert("Registro simulado exitoso. Ahora inicia sesión.");
    } catch (error) {
      console.error("Error en registro:", error.message);
      alert(error.message);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setEmail("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

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
        setIsAuthenticated,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;


