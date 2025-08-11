import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Button, Badge } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import ApiService from "../services/ApiService";

const Notifications = () => {
  const { user } = useContext(UserContext);
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const marcarComoLeida = async (id) => {
    try {
      await ApiService.markNotificationAsRead(id);
      setNotificaciones((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (error) {
      console.error("Error al marcar como leída:", error);
      alert("No se pudo marcar como leída");
    }
  };

  const eliminarNotificacion = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta notificación?")) return;
    try {
      await ApiService.deleteNotification(id);
      setNotificaciones((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error al eliminar notificación:", error);
      alert("No se pudo eliminar la notificación");
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await ApiService.getNotifications();
        setNotificaciones(res.data);
      } catch (err) {
        console.error("Error al cargar notificaciones", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-4">
        <i className="fa-solid fa-bell text-info me-2"></i> Tus Notificaciones
      </h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : notificaciones.length === 0 ? (
        <p className="text-muted text-center">No tienes notificaciones nuevas 📭</p>
      ) : (
        <Row className="g-4">
          {notificaciones.map((n) => (
            <Col key={n.id} xs={12} md={6} lg={3}>
              <Card border="secondary" style={{ width: '18rem' }}
                
              >
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="flex-grow-1">
                      <Card.Title className="mb-0">
                        <i className="fa-solid fa-user-circle me-2 text-primary"></i>
                        {`${n.interested_first_name} ${n.interested_last_name}`}{" "}
                        <Badge bg="secondary" pill>
                          {n.interested_email}
                        </Badge>
                      </Card.Title>
                      <Card.Subtitle className="text-muted small">
                        preguntó por <em>{n.product_title}</em>
                      </Card.Subtitle>
                    </div>
                    {!n.is_read && (
                      <Badge bg="warning" text="dark">
                        Nuevo
                      </Badge>
                    )}
                  </div>

                  <Card.Text className="fst-italic">
                    “{n.message}”
                  </Card.Text>
                  <small className="text-muted d-block mb-3">
                    {new Date(n.created_at).toLocaleString()}
                  </small>

                  <div className="d-flex gap-2">
                    <Button
                      variant={n.is_read ? "success" : "outline-success"}
                      size="sm"
                      onClick={() => marcarComoLeida(n.id)}
                      disabled={n.is_read}
                    >
                      {n.is_read ? "✅ Leída" : "Marcar como leída"}
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => eliminarNotificacion(n.id)}
                    >
                      🗑️ Eliminar
                    </Button>
                  </div>
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

