import { Row, Col, Card, Button } from "react-bootstrap"

const ProfileWelcomePanel = ({user}) => {

    const getInitials = (name) => {
        return `${name[0] || ""}`.toUpperCase()
    }

    return(
            <Card className="p-4 shadow-sm">
                <Row className="align-items-center">
                    <Col md={2}>
                        {user.picture ? (
                            <img src={user.picture} alt="Foto de perfil" className="img-fluid rounded-circle"/>
                        ) : (
                            <div className="rounded-circle text-white d-flex align-items-center justify-content-center"
                                style={{width: "100px", height: "100px", fontSize: "2rem", fontWeight: "bold", backgroundColor: "#17a2b8"}}>
                                        {getInitials(user.name)}
                            </div>
                        )}
                    </Col>
                    <Col>
                        <h4 className="mb-1">Bienvenido {user.name}</h4>
                        <p className="mb-0">Email: {user.email}</p>
                        <p className="mb-0">City: {user.city}</p>
                        <p className="mb-2">Phone: {user.phone}</p>
                        <div>
                            <Button variant="link" href="/profileEdit" className="me-2">
                                Editar perfil
                            </Button>
                            <Button variant="link" href="profile/publicarArticulo">
                                Nueva publicación
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card>
    )
}

export default ProfileWelcomePanel