import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardProducto from "../../components/cardProducto/CardProducto";
import CategoriesNav from "../../components/categoriesNav/categoriesNav";
import { useProducts } from "../../hooks/useProducts";
import { filtrarPorCategoria } from "../../components/utils/filterByCategory";
import { useSearch } from "../../context/SearchContext";
import HeaderChilden from "../../components/header/HeaderChildren";

function PageChildren() {
  const { busqueda } = useSearch();
  const { products: nuevosArticulos, loading, error } = useProducts();
  const todosLosArticulos = [ ...nuevosArticulos];
  const articulosFiltrados = filtrarPorCategoria(
    todosLosArticulos,
    "niñ@s",
    busqueda
  );
  return (
    <section>
      <CategoriesNav />
      <HeaderChilden />
      <Container className="my-5">
        {loading ? (
          <p>Cargando artículos...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Row className="g-4">
            {articulosFiltrados.length > 0 ? (
              articulosFiltrados.map((articulo) => (
                <Col key={articulo.id} xs={12} sm={6} md={4} lg={3}>
                  <CardProducto articulo={articulo} />
                </Col>
              ))
            ) : (
              <Col>
                <p className="text-center text-muted">
                  No se encontraron artículos para esta categoría.
                </p>
              </Col>
            )}
          </Row>
        )}
      </Container>
    </section>
  );
}
export default PageChildren;
