import { Row, Col, Card, Button } from "react-bootstrap"

const ProfileWelcomePanel = ({user}) => {

    const getInitials = (nombre, apellido) => {
        return `${nombre[0] || ""}${apellido[0] || ""}`.toUpperCase()
    }

    return(
            <Card className="p-4 shadow-sm">
                <Row className="align-items-center">
                    <Col md={2}>
                        {user.imagen ? (
                        <img
                            src={user.imagen}
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
                            backgroundColor: "#17a2b8"
                            }}
                        >
                            {getInitials(user.nombre, user.apellido)}
                        </div>
                        )}
                    </Col>
                    <Col>
                        <h4>
                        Bienvenido {user.nombre} {user.apellido}
                        </h4>
                        <p className="mb-1">ID de usuario: {user.id}</p>
                        <p className="mb-3">Correo: {user.email}</p>
                        <div>
                        <Button
                            variant="link"
                            href="/profile/edit"
                            className="me-2"
                        >
                            Editar perfil
                        </Button>
                        <Button variant="link" href="/publicar">
                            Publicar artículo
                        </Button>
                        </div>
                    </Col>
                </Row>
            </Card>
    )
}

export default ProfileWelcomePanel