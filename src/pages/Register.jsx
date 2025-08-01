import { useState, useContext } from "react"
import {Form, Button} from "react-bootstrap"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom" 


const Register = () => {
  const { register } = useContext(UserContext)
  const navigate = useNavigate()
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pwOk, setPwOk] = useState("")
  const [error, setError] = useState({ email: "", password: "", pwOk: "" })
  const [formEnviado, setFormEnviado] = useState(false)
  const [mensajeError, setMensajeError] = useState("")

  const validarDatos = async (e) => {
    e.preventDefault()

    let validar = { email: "", password: "", pwOk: "", ciudad: "", telefono: "" }

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

    // Validación ciudad y telefono
    if (!ciudad.trim()) {
  validar.ciudad = "La ciudad es obligatoria";
    }
   if (!telefono.trim() || !/^[0-9]{8,15}$/.test(telefono)) {
   validar.telefono = "Ingresa un número válido";
  }

    setError(validar)

    // Si hay errores, no enviar el formulario
    if (validar.email || validar.password || validar.pwOk  || validar.ciudad || validar.telefono) {
      return
    }

    try {
      await register(email, password, nombre, apellido, telefono, ciudad)
      setFormEnviado(true)
      setMensajeError("")
      setTimeout(() => navigate("/profile"), 2000) // Redirigir al perfil
    } catch (err) {
  setMensajeError(err.message || "Error al iniciar sesión")
}
  }

  return (
     <section className="container my-5 d-flex justify-content-center align-items-center">
  <div className="bg-white rounded-5 shadow p-5" style={{ width: '100%', maxWidth: '700px' }}>
    <h2 className="text-center mb-4">Crea una cuenta nueva</h2>

    <Form onSubmit={validarDatos} noValidate>
      {formEnviado && <p className="text-success text-center">¡Registro exitoso!</p>}
      {mensajeError && <p className="text-danger text-center">{mensajeError}</p>}

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <Form.Control
            type="text"
            placeholder="Nombre"
            size="lg"
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <Form.Control
            type="text"
            placeholder="Apellido"
            size="lg"
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
      </div>

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

      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          name="passwordOk"
          size="lg"
          placeholder="Confirmar contraseña"
          onChange={(e) => setPwOk(e.target.value)}
          value={pwOk}
          required
        />
        {error.pwOk && <small className="text-danger">{error.pwOk}</small>}
      </Form.Group>
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <Form.Control
            type="text"
            placeholder="Ciudad"
            size="lg"
            onChange={(e) => setCiudad(e.target.value)}
          />
          {error.ciudad && <small className="text-danger">{error.ciudad}</small>}
        </div>
        <div className="col-md-6">
          <Form.Control
            type="text"
            placeholder="Telefono"
            size="lg"
            onChange={(e) => setTelefono(e.target.value)}
          />
          {error.telefono && <small className="text-danger">{error.telefono}</small>}
        </div>
      </div>

  

      <div className="d-grid">
        <Button variant="dark" size="lg" type="submit">Crear cuenta</Button>
      </div>
    </Form>
  </div>
</section>

  )
}

export default Register


