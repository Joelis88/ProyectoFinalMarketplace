import { useState } from 'react';
import AddPost from "../components/post/AddPost";
import CardProducto from "../components/cardProducto/CardProducto";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PostManager = () => {
  const [articulos, setArticulos] = useState([]);
  

  const handleAgregarArticulo = (nuevoArticulo) => {
    setArticulos([nuevoArticulo, ...articulos]);
  };

  return (
    <Container className="my-5">
      <AddPost onAgregar={handleAgregarArticulo} />
      
      <hr className="my-5" />

      <Row className="g-4">
        {articulos.map((art) => (
     <Col md={4} key={art.id}>
     <CardProducto articulo={art} />
  </Col>
))}
    
      </Row>
    </Container>
  );
};

export default PostManager;
