/* eslint-disable no-undef */
import CardProducto from "../components/cardProducto/CardProducto";
import Header from "../components/header/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoriesNav from "../components/categoriesNav/categoriesNav";
import { useProducts } from "../hooks/useProducts";
import { useSearch } from "../context/SearchContext";




function Home() {
  const { busqueda } = useSearch();
  const { products: nuevosArticulos, loading, error } = useProducts();

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  const todosLosArticulos = [  ...nuevosArticulos];

  const articulosFiltrados = todosLosArticulos.filter((articulo) =>
    articulo.title.toLowerCase().includes(busqueda.toLowerCase())
  );


  return (
    <section>
      <CategoriesNav />
      <Header />
      <Container className="my-5">
        <Row className="g-4">
          {articulosFiltrados.map((articulo) => (
            <Col key={articulo.id} xs={12} sm={6} md={4} lg={3}>
              <CardProducto articulo={articulo} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Home;
