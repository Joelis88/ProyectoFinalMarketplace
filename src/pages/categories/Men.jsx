import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardProducto from "../../components/cardProducto/CardProducto"
import CategoriesNav from '../../components/categoriesNav/categoriesNav'
import { articulos } from '../../mockData/articulos'
import HeaderMen from '../../components/header/HeaderMen'

function Men({ busqueda = "" }) {
  const articulosFiltrados = articulos
    .filter((articulo) => articulo.categoria.toLowerCase() === "hombre")
    .filter((articulo) =>
      articulo.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

  return (
    <section>
      <CategoriesNav />
      <HeaderMen />
      <Container className="my-5">
        <Row className="g-4">
          {articulosFiltrados.length > 0 ? (
            articulosFiltrados.map((articulo) => (
              <Col key={articulo.id} xs={12} sm={6} md={4} lg={3}>
                <CardProducto articulo={articulo} />
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-center text-muted">No se encontraron artículos para esta categoría.</p>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
}

export default Men