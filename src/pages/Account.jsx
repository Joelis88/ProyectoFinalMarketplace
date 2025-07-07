import { Container, Row, Col } from "react-bootstrap"
import Sidebar from "../components/Sidebar"
import ProfileWelcomePanel from "../components/ProfileWelcomePanel"
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


const Account = () => {
 const { user } = useContext(UserContext); 

   const { logout } = useContext(UserContext);
  

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


