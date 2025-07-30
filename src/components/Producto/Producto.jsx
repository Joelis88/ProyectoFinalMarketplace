import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { formatPrice } from '../utils/formatPrice';


import "./producto.css"

import ListGroup from 'react-bootstrap/ListGroup';

const Producto = ({ articulo }) => {
  if (!articulo) {
    return <h2 className="text-center my-5">Artículo no encontrado</h2>;
  }

  return (
  <Container className="my-5 d-flex justify-content-center">
  <Card className="shadow-lg" style={{ maxWidth: '600px', width: '100%', borderRadius: '0.75rem' }}>
    

    <Card.Img
      variant="top"
      src={articulo.image_url}
      alt={articulo.title}
      style={{
        height: '400px',
        objectFit: 'cover',
        borderRadius: '0.75rem 0.75rem 0 0',
      }}
    />

    <ListGroup className="mb-0">
      <ListGroup.Item className="px-4 py-3">
        <i className="fa-solid fa-tag me-2"></i>
        <strong>Categoría:</strong> {articulo.category}
      </ListGroup.Item>
    </ListGroup>

    <Card.Body className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Card.Title className="fs-3 fw-bold mb-0">{articulo.title}</Card.Title>
        <h4 className="text-success fw-bold mb-0">
          <i className="fa-solid fa-dollar-sign me-1"></i>{formatPrice(articulo.price)}
        </h4>
      </div>

      <div className="d-flex justify-content-between mb-3 text-muted">
        <span>
          <i className="fa-solid fa-location-dot me-1"></i>
          {articulo.location}
        </span>
        <span>
          <i className="fa-solid fa-clipboard-list"></i><strong>  condition:</strong> {articulo.condition}
        </span>
      </div>

      <Card.Text className="mb-4">
        {articulo.description}
      </Card.Text>
    </Card.Body>
  </Card>
</Container>


  );
};


export default Producto;
