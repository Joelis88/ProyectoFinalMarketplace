import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ContactSeller from '../components/contactSeller/ContactSeller';
import Producto from '../components/Producto/Producto';
import { articulos } from '../mockData/articulos';

function ProductView() {
  const { id } = useParams();
  const articulo = articulos.find((item) => item.id === parseInt(id));

  if (!articulo) {
    return <h2 className="text-center my-5">Artículo no encontrado</h2>;
  }

  return (
    <Container className="my-5">
      <Row>
      
        <Col md={7}>
          <Producto articulo={articulo} />
        </Col>

      
        <Col md={5}>
          <ContactSeller vendedor={articulo.vendedor} email={articulo.email} />
        </Col>
      </Row>
    </Container>
  );
}

export default ProductView;
