import { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { notificaciones } from '../mockData/notificaciones';
import { UserContext } from '../context/UserContext';

const Notifications = () => {
  const { user } = useContext(UserContext);

  // Filtrar notificaciones solo de los artículos del usuario logueado
  const notificacionesUsuario = notificaciones.filter(
    (n) => user?.nombre === "Juan Pérez"
  );

  return (
    <Container className="my-5">
      <h2 className="mb-4">Tus Notificaciones</h2>
      <Row className="g-4">
        {notificacionesUsuario.map((n) => (
          <Col key={n.id} xs={12} md={6} lg={4}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>
                  <i className="fa-solid fa-bell me-2 text-info "></i>
                  <strong>{n.comprador}</strong>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  preguntó por <em>{n.articuloTitulo}</em>
                </Card.Subtitle>
                <Card.Text>
                  <q>{n.mensaje}</q>
                </Card.Text>
                <div className="mb-2">
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${n.email}`}>{n.email}</a>
                </div>
                <small className="text-muted">{n.fecha}</small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Notifications;
