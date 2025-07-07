import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardProducto from "../../components/cardProducto/CardProducto"
import CategoriesNav from '../../components/categoriesNav/categoriesNav'
import { articulos } from '../../mockData/articulos'
import HeaderChilden from '../../components/header/HeaderChildren'



function PageChildren({ busqueda = "" }) {
  const articulosFiltrados = articulos
    .filter((articulo) => articulo.categoria.toLowerCase() === "niñ@s")
    .filter((articulo) =>
      articulo.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

  return (
    <section>
      <CategoriesNav />
      <HeaderChilden />
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
export default PageChildren
