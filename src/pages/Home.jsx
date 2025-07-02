
import CardProducto from '../components/CardProducto'
import Header from "../components/Header"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav2 from '../components/Nav2'




function Home() {
  const productos = [
    { id: 1, nombre: 'Producto 1' },
    { id: 2, nombre: 'Producto 2' },
    { id: 3, nombre: 'Producto 3' },
    { id: 4, nombre: 'Producto 4' },

  ]
  
   
  return (
      <section>
        <Nav2/>
        <Header />
        <Container className="my-5">
        <Row className="g-4">
          {productos.map((producto) => (
            <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
              <CardProducto producto={producto} />
            </Col>
          ))}
        </Row>
      </Container>
      </section>
    )
  }
  
  export default Home