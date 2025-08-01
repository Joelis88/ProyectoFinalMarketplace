import { Container, Row, Col } from "react-bootstrap";

import ProfileEditPanel from "../components/ProfileEditPanel";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const logout = () => {
    console.log("Cerrando sesión...");
  };

  return (
    <Container fluid className="mt-5">
      <Row className="align-items-start">
        <Col md={2} className="px-4">
          <Sidebar onLogout={logout} />
        </Col>

        <Col md={8}>
          <ProfileEditPanel />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
