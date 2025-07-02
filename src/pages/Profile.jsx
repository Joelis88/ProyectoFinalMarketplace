import { useEffect, useContext } from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { UserContext } from "../context/UserContext"
import profileImg from "../assets/imgprofile.png" 

const Profile = () => {
  const { user, getProfile, logout } = useContext(UserContext)

  useEffect(() => {
    getProfile()
  }, [])

  if (!user) {
    return <p>Cargando perfil...</p>
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <h2>Perfil de usuario</h2>
          <Card className="mb-5" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={profileImg} alt="Perfil" />
            <Card.Body className="text-center">
              <Card.Title>Usuario</Card.Title>
              <Card.Text>Email: {user.email}</Card.Text>
              <Button variant="primary" onClick={logout}>
                Cerrar sesión
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
