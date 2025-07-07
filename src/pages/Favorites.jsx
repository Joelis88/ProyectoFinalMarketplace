import { useEffect, useState } from 'react';
import { articulos } from '../mockData/articulos';
import CardProducto from '../components/cardProducto/CardProducto';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from '../components/Sidebar';


function Favorites() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos')) || [];
    const articulosFavoritos = articulos.filter((articulo) => favoritosGuardados.includes(articulo.id));
    setFavoritos(articulosFavoritos);
  }, []);

  return (
    <section>
      
      <Container fluid className="mt-5">
      <Row className="align-items-start">
        <Col md={2} className="px-4">
          <Sidebar />
        </Col>

        <Col md={10}>
          <Row className="g-4"><h2>Mis favoritos</h2>
          {favoritos.length > 0 ? (
            favoritos.map((articulo) => (
              <Col key={articulo.id} xs={12} sm={6} md={4} lg={3}>
                <CardProducto articulo={articulo} />
              </Col>
            ))
          ) : (
            <p className="text-muted">No has marcado artículos como favoritos.</p>
          )}
        </Row>
        </Col>
      </Row>
    </Container>
    </section>
  );
}

export default Favorites;
