// import { useEffect, useContext } from "react"
import { Container, Row, Col,} from "react-bootstrap"
// import { UserContext } from "../context/UserContext"

import ProfileEdit from "../components/ProfileEdit"
import Sidebar from "../components/Sidebar"

const Profile = () => {
  const user = {
    email: "usuario@ejemplo.com"
  }

  const logout = () => {
    console.log("Cerrando sesión...")
  }

  return (
    <Container fluid className="mt-5">
      <Row className="align-items-start">
      
        <Col md={2} className="px-4">
          <Sidebar/>
        </Col>

      
        <Col md={10}>
          <ProfileEdit />
        </Col>
      </Row>
    </Container>
  )
}

export default Profile