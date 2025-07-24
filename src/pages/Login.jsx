import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"

const Login = () => {
  const { login } = useContext(UserContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState({ email: "", password: "" })
  const [formEnviado, setFormEnviado] = useState(false)
  const [mensajeError, setMensajeError] = useState("")

  const validarDatos = async (e) => {
    e.preventDefault()

    const validar = {
      email: "",
      password: ""
    }

    if (!email.trim()) {
      validar.email = "El correo es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validar.email = "Correo inválido"
    }

    if (!password.trim()) {
      validar.password = "La contraseña es obligatoria"
    } else if (password.length < 6) {
      validar.password = "Debe tener al menos 6 caracteres"
    }

    setError(validar)

    const sinErrores = !validar.email && !validar.password

    if (sinErrores) {
      try {
        await login(email, password)
        setFormEnviado(true)
        navigate("/profile")
      } catch (err) {
  setMensajeError(err.message || "Error al iniciar sesión")

      }
    } else {
      setFormEnviado(false)
    }
  }

  return (
    <Container className="my-5">
      <Row className="">
        <Col md={6} className="text-center mb-4 mb-md-0">
          <h2 className="display-6">
            Ingresa con tu e-mail <br /> para iniciar sesión
          </h2>
        </Col>

        {/* formulario */}
        <Col md={6}>
          <div className="bg-white rounded-5 shadow p-5 mx-auto" style={{ maxWidth: "500px" }}>
            <Form onSubmit={validarDatos} noValidate>
              {formEnviado && (
                <p className="text-success text-center">Inicio de sesión exitoso</p>
              )}
              {mensajeError && (
                <p className="text-danger text-center">{mensajeError}</p>
              )}

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  size="lg"
                  placeholder="Correo electrónico"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                {error.email && <small className="text-danger">{error.email}</small>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  size="lg"
                  placeholder="Contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                {error.password && <small className="text-danger">{error.password}</small>}
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Recuérdame" />
              </Form.Group>

              <div className="d-grid mb-3">
                <Button variant="dark" size="lg" type="submit">
                  Ingresar
                </Button>
              </div>

              <hr className="my-4" />

              <div className="text-center">
                <Form.Text className="text-muted">¿No tienes cuenta?</Form.Text>
                <div className="d-grid mt-3">
                  <Button
                    variant="outline-dark"
                    size="lg"
                    onClick={() => navigate("/register")}
                  >
                    Regístrate
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Login


