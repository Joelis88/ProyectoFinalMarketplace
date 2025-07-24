import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Row, Col, Card, Button } from "react-bootstrap";

const ProfileWelcomePanel = () => {
  const { user } = useContext(UserContext); 

  if (!user) return <p className="text-muted">Usuario no autenticado</p>;

  const getInitials = (last_name) => {
    return `${last_name?.[0] || ""}`.toUpperCase();
  };

  return (
    <Card className="p-4 shadow-sm w-75">
      <Row className="align-items-center">
        <Col md={2}>
          {user.image_url ? (
            <img
              src={user.image_url}
              alt="Foto de perfil"
              className="img-fluid rounded-circle"
            />
          ) : (
            <div
              className="rounded-circle text-white d-flex align-items-center justify-content-center"
              style={{
                width: "100px",
                height: "100px",
                fontSize: "2rem",
                fontWeight: "bold",
                backgroundColor: "#17a2b8",
              }}
            >
              {getInitials(user.last_name)}
            </div>
          )}
        </Col>
        <Col>
          <h4 className="mb-1">Bienvenido {user?.first_name} {user?.last_name}</h4>
          <p className="mb-0">Email: {user.email}</p>
          <p className="mb-0">Ciudad: {user.ciudad}</p>
          <p className="mb-2">Teléfono: {user.telefono}</p>
          <div>
            <Button variant="link" href="/profileEdit" className="me-2">
              Editar perfil
            </Button>
            <Button variant="link" href="/profile/publicarArticulo">
              Nueva publicación
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ProfileWelcomePanel;
