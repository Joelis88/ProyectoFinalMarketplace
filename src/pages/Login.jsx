import { useState, useContext } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const { login } = useContext(UserContext)
  const navigate = useNavigate() // Hook
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState({ email: "", password: "" })
  const [formEnviado, setFormEnviado] = useState(false)
  const [mensajeError, setMensajeError] = useState("") 

  const validarDatos = async (e) => {
    e.preventDefault();

    let validar = {
      email: "",
      password: ""
    }

    // Validación email
    if (!email.trim()) {
      validar.email = "Todos los campos son obligatorios"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validar.email = "El email no es válido."
    }

    // Validación contraseña
    if (!password.trim()) {
      validar.password = "Todos los campos son obligatorios"
    } else if (password.length < 6) {
      validar.password = "La contraseña debe tener al menos 6 caracteres"
    }

    // Actualiza el estado de errores
    setError(validar)

    // Comprueba si hay errores
    const sinErrores = !validar.email && !validar.password

    if (sinErrores) {
      try {
        await login(email, password); // Llamamos a la función login del contexto
        setFormEnviado(true)
        navigate("/profile") // Redirigir al perfil después del login exitoso
      } catch (error) {
        setMensajeError("Error al iniciar sesión.")
      }
    } else {
      setFormEnviado(false)
    }
  }

  return (
    <section className="container border border-light-subtle rounded-5 bg-white p-5">
      <h2>Inicio de sesión</h2>
      <Form onSubmit={validarDatos} noValidate>
        {formEnviado && (
          <p style={{ color: "green" }}>Inicio de sesión exitoso</p>
        )}
        {mensajeError && <p style={{ color: "red" }}>{mensajeError}</p>}

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            size="lg"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Ingresa tu email"
            required
          />
          {error.email && <p style={{ color: "red" }}>{error.email}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            size="lg"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Ingresa tu contraseña"
            required
          />
          {error.password && <p style={{ color: "red" }}>{error.password}</p>}
        </Form.Group>

        <div className="d-flex justify-content-center mb-4 mt-4">
          <Button variant="dark" type="submit">Enviar</Button>
        </div>
      </Form>
    </section>
  )
}

export default Login


