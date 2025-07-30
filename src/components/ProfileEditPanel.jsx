import { useState, useContext, useEffect } from "react";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

const ProfileEditPanel = () => {
  const { user, updateProfile, token } = useContext(UserContext);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user) {
      setNombre(user.first_name || "");
      setApellido(user.last_name || "");
      setEmail(user.email || "");
      setCiudad(user.address || "");
      setTelefono(user.phone || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const datosActualizados = {
      first_name: nombre,
      last_name: apellido,
      phone: telefono,
      address: ciudad,
    };

    updateProfile(datosActualizados); 
    setMensaje("Cambios guardados exitosamente.");
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/profile/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al cambiar la contraseña");
      }

      alert("Contraseña cambiada exitosamente");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error.message);
      alert(error.message);
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-start py-4">
      <div className="w-100" style={{ maxWidth: "800px" }}>
        <Container>
          <Row>
            <Col>
              <Card className="mb-4 shadow-sm rounded-4">
                <Card.Body>
                  <h4 className="mb-4 text-center">Datos del perfil</h4>
                  {mensaje && (
                    <p className="text-success text-center">{mensaje}</p>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Nombre"
                        size="lg"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Apellido"
                        size="lg"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="email"
                        placeholder="Correo electrónico"
                        size="lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Ciudad"
                        size="lg"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="tel"
                        placeholder="Teléfono"
                        size="lg"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button variant="dark" size="lg" type="submit">
                        Guardar cambios
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="shadow-sm rounded-4">
                <Card.Body>
                  <h4 className="mb-4 text-center">Cambiar contraseña</h4>

                  <Form onSubmit={handlePasswordChange}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder="Contraseña actual"
                        size="lg"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder="Nueva contraseña"
                        size="lg"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button variant="secondary" size="lg" type="submit">
                        Cambiar contraseña
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default ProfileEditPanel;
