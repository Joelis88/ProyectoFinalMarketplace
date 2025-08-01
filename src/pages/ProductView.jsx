import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ContactSeller from '../components/contactSeller/ContactSeller';
import Producto from '../components/Producto/Producto';
import { articulos as mockArticulos } from '../mockData/articulos';
import { useProducts } from '../hooks/useProducts';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
function ProductView() {
  const { id } = useParams();
  const { products: nuevosArticulos, loading } = useProducts();
  const { user } = useContext(UserContext);

  const allArticulos = [...mockArticulos, ...nuevosArticulos];
  const articulo = allArticulos.find((item) => item.id === parseInt(id));

  if (loading) return <h2 className="text-center my-5">Cargando producto...</h2>;

  if (!articulo) {
    return <h2 className="text-center my-5">Artículo no encontrado</h2>;
  }

  // ✅ ahora que artículo existe, ya podés acceder a sus propiedades
  const esPropietario = user?.id === articulo.user_id;

  return (
    <Container className="my-5">
      <Row>
        <Col md={7}>
          <Producto articulo={articulo} />
        </Col>
        <Col md={5}>
          {!esPropietario && (
            <ContactSeller
              vendedor={articulo.vendedor}
              email={articulo.email}
              productId={articulo.id} 
              productTitle={articulo.title}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}



export default ProductView;

