import { useContext } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";

import Sidebar from "../components/Sidebar";
import CardProducto from "../components/cardProducto/CardProducto";
import { UserContext } from "../context/UserContext";
import { useProducts } from "../hooks/useProducts";

const MyPosts = () => {
  const { user, logout } = useContext(UserContext);
  const shouldFetch = !!user?.id;


  const { products: articulos, loading } = useProducts(
  shouldFetch ? { user_id: user.id } : null
);
if (!shouldFetch) {
  return <p className="text-center mt-5">Cargando usuario...</p>;
}

  return (
    <Container fluid className="mt-5">
      <Row className="align-items-start">
        <Col md={2} className="px-4">
          <Sidebar onLogout={logout} />
        </Col>

        <Col md={10}>
          <Stack gap={3} className="text-center mb-4">
            <div className="fs-3 fw-bold">📦 Mis publicaciones</div>
            {user ? (
              <div className="text-muted">
                Publicaciones de <strong>{user.first_name} {user.last_name}</strong>
              </div>
            ) : (
              <div className="text-danger">Debes iniciar sesión para ver tus publicaciones</div>
            )}
          </Stack>

          <hr className="my-4" />

          {loading ? (
            <p>Cargando artículos...</p>
          ) : articulos.length === 0 ? (
            <p>No tienes artículos publicados.</p>
          ) : (
            <Row className="g-4">
              {articulos.map((art) => (
                <Col md={4} key={art.id}>
                  <CardProducto articulo={art} modoMisPublicaciones />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MyPosts;

