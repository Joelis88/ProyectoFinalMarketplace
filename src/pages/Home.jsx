
import CardProducto from '../components/cardProducto/CardProducto'
import Header from "../components/header/Header"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CategoriesNav from '../components/categoriesNav/categoriesNav'
import { articulos } from '../mockData/articulos'




function Home({ busqueda }) {

  const articulosFiltrados = articulos.filter((articulo) =>
  articulo.titulo.toLowerCase().includes(busqueda.toLowerCase())
);
   
  return (
      <section>
        <CategoriesNav/>
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
    )
  }
  
  export default Home