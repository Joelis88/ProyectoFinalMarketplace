import { createContext, useState, useEffect } from "react";

const UserContext = createContext();


const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [errorMessage, setErrorMessage] = useState("");
  const [profile, setProfile] = useState(null);

const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3001/api/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("Datos del perfil:", data);

    if (!res.ok) {
      throw new Error(data.error || "Error al obtener el perfil");
    }

    setUser(data.data);

  } catch (error) {
    console.error("Error al obtener el perfil:", error.message);
  }
};

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);

  const updateProfile = async (profileData) => {
  try {
    const res = await fetch("http://localhost:3001/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al actualizar el perfil");
    }

    setUser(data.data); // Actualiza el estado con los datos nuevos
    alert("Perfil actualizado con éxito.");
  } catch (error) {
    console.error("Error al actualizar perfil:", error.message);
    alert(error.message);
  }
};

  const login = async (email, password) => {
  try {
    console.log("Enviando datos de registro:", { email, password });
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json(); 
    console.log("Respuesta del backend:", data);

    if (!response.ok) {
      throw new Error(data.error || "Credenciales incorrectas");
    }

    const token = data.data.token;

localStorage.setItem("token", token);
localStorage.setItem("email", email);

setToken(token);
setEmail(email);
setIsAuthenticated(true);


setTimeout(() => {
  getProfile();
}, 100);

  } catch (error) {
    console.error("Error en login:", error.message);
    setErrorMessage(error.message);
    alert(error.message);
  }
};

  const register = async (email, password, first_name, last_name, phone, address) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, first_name, last_name, phone, address }),
      });

       if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Registro fallido");
       }

      alert("Registro exitoso. Ahora puedes iniciar sesión.");
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
        updateProfile,
        isAuthenticated,
        setIsAuthenticated,
        errorMessage,
        setErrorMessage,
        profile,
        setProfile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };



