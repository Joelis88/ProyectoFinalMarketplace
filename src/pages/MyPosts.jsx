import { Container, Row, Col } from "react-bootstrap"
import Sidebar from "../components/Sidebar"
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import CardProducto from "../components/cardProducto/CardProducto";
import { articulos } from "../mockData/articulos";

const MyPosts = () => {
  const { user } = useContext(UserContext); 


  const nombreVendedor = user?.nombre
  
  const misArticulos = articulos.filter(articulo => articulo.vendedor === nombreVendedor);

  return (
    <Container fluid className="mt-5">
      <Row className="align-items-start">
        <Col md={2} className="px-4">
          <Sidebar />
        </Col>

        <Col md={10}>
          <Row className="g-4"><h2>Mis Publicaciones</h2>
            {misArticulos.map((articulo) => (
              <Col key={articulo.id} xs={12} sm={6} md={4} lg={3}>
                <CardProducto articulo={articulo} modoMisPublicaciones />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MyPosts;
