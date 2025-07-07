import { Container, Row, Col, Card, Button } from "react-bootstrap"
import Sidebar from "../components/Sidebar"
import ProfileWelcomePanel from "../components/ProfileWelcomePanel"

const Account = () => {
  const user = {
    id: 12345,
    nombre: "Juan Perez",
    email: "usuario@ejemplo.com",
    telefono: 912345678,
    ciudad: "Concepción",
    foto: null // no tiene imagen cargada
  }

  const logout = () => {
    console.log("Cerrando sesión...")
  }

  return (
    <Container fluid className="mt-5">
      <Row className="align-items-start">
        <Col md={2} className="px-4">
          <Sidebar onLogout={logout} />
        </Col>

        <Col md={10}>
          <ProfileWelcomePanel user={user}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Account


