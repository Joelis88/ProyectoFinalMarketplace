import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from '../components/Sidebar';
import Notifications from '../components/Notifications';


function PageNotifications() {
  const { logout } = useContext(UserContext);
  

  return (
    <section>
      
      <Container fluid className="mt-5">
      <Row className="align-items-start">
        <Col md={2} className="px-4">
          <Sidebar onLogout={logout} />
        </Col>

        <Col md={10}>
          <Row className="g-4">
         
              <Col>
                <Notifications />
              </Col>
        </Row>
        </Col>
      </Row>
    </Container>
    </section>
  );
}
export default PageNotifications