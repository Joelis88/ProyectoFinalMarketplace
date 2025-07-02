import { useState, useContext } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom" 

const Register = () => {
  const { register } = useContext(UserContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pwOk, setPwOk] = useState("")
  const [error, setError] = useState({ email: "", password: "", pwOk: "" })
  const [formEnviado, setFormEnviado] = useState(false)
  const [mensajeError, setMensajeError] = useState("")

  const validarDatos = async (e) => {
    e.preventDefault()

    let validar = { email: "", password: "", pwOk: "" }

    // Validación email
    if (!email.trim()) {
      validar.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validar.email = "El email no es válido."
    }

    // Validación contraseña
    if (!password.trim()) {
      validar.password = "La contraseña es obligatoria"
    } else if (password.length < 6) {
      validar.password = "Debe tener al menos 6 caracteres"
    }

    // Validación de confirmación de contraseña
    if (!pwOk.trim()) {
      validar.pwOk = "Debes confirmar la contraseña"
    } else if (password !== pwOk) {
      validar.pwOk = "Las contraseñas no coinciden"
    }

    setError(validar)

    // Si hay errores, no enviar el formulario
    if (validar.email || validar.password || validar.pwOk) {
      return
    }

    try {
      await register(email, password)
      setFormEnviado(true)
      setMensajeError("")
      setTimeout(() => navigate("/profile"), 2000) // Redirigir al perfil
    } catch (error) {
      setMensajeError("Error al registrarse. Inténtalo de nuevo.")
    }
  }

  return (
    <section className="container border border-light-subtle rounded-5 bg-white p-5">
      <h2>Crea tu cuenta</h2>

      <Form onSubmit={validarDatos} noValidate>
        {formEnviado && <p style={{ color: "green" }}>Registro exitoso</p>}
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

        <Form.Group>
          <Form.Label>Verificar Password</Form.Label>
          <Form.Control
            type="password"
            name="passwordOk"
            size="lg"
            onChange={(e) => setPwOk(e.target.value)}
            value={pwOk}
            placeholder="Repite tu contraseña"
            required
          />
          {error.pwOk && <p style={{ color: "red" }}>{error.pwOk}</p>}
        </Form.Group>

        <div className="d-flex justify-content-center mb-4 mt-4">
          <Button variant="dark" type="submit">Registrar</Button>
        </div>
      </Form>
    </section>
  )
}

export default Register


