import { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

const ProfileEdit = () => {
  const { user, updateProfile } = useContext(UserContext);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [foto, setFoto] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (user) {
      setNombre(user.nombre || "");
      setApellido(user.apellido || "");
      setEmail(user.email || "");
      setCiudad(user.ciudad || "");
      setTelefono(user.telefono || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const datosActualizados = {
      nombre,
      apellido,
      email,
      ciudad,
      telefono,
      foto,
    };

    updateProfile(datosActualizados); //datos al backend
    setMensaje("Cambios guardados exitosamente.");
  };

  return (
    <section className="d-flex justify-content-center align-items-start">
      <div
        className="bg-white rounded-5 shadow p-5"
        style={{ width: "100%", maxWidth: "700px" }}
      >
        <h2 className="text-center mb-4">Editar perfil</h2>

        {mensaje && <p className="text-success text-center">{mensaje}</p>}

        <Form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <Form.Control
                type="text"
                placeholder="Nombre"
                size="lg"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <Form.Control
                type="text"
                placeholder="Apellido"
                size="lg"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled // email no se edita
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

          <Form.Group className="mb-4">
            <Form.Label>Foto de perfil</Form.Label>
            <Form.Control
              type="file"
              size="lg"
              onChange={(e) => setFoto(e.target.files[0])}
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="dark" size="lg" type="submit">
              Guardar cambios
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default ProfileEdit;
