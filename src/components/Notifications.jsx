import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import ApiService from '../../services/api'

const Notifications = () => {
  const { user } = useContext(UserContext);
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await ApiService.getNotifications();
        setNotificaciones(res.data);
      } catch (err) {
        console.error('Error al cargar notificaciones', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);


  return (
 <Container className="my-5">
      <h2 className="mb-4">Tus Notificaciones</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row className="g-4">
          {notificaciones.map((n) => (
            <Col key={n.id} xs={12} md={6} lg={4}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>
                    <i className="fa-solid fa-bell me-2 text-info "></i>
                    <strong>{n.created_by_name || 'Comprador anónimo'}</strong>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    preguntó por <em>{n.product_title}</em>
                  </Card.Subtitle>
                  <Card.Text>
                    <q>{n.message}</q>
                  </Card.Text>
                  <small className="text-muted">
                    {new Date(n.created_at).toLocaleString()}
                  </small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};


export default Notifications;
