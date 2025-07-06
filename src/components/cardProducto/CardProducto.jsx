import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import "./CardProducto.css";

const CardProducto = ({ articulo }) => {
  if (!articulo) return null;

  const [liked, setLiked] = useState(false);
  const toggleLike = () => setLiked(!liked);

  return (
    <div className="card-container" style={{ position: 'relative', width: '18rem' }}>
      <div className="heart-icon" onClick={toggleLike}>
        <i className={`fa${liked ? 's' : 'r'} fa-heart`}></i>
      </div>

      <Card className="shadow-sm">
        <Card.Img
          variant="top"
          src={articulo.imagen || 'https://via.placeholder.com/300'}
          alt={articulo.titulo}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>{articulo.titulo || 'Sin título'}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <i className="fa-solid fa-location-dot me-1"></i>
            {articulo.ubicacion || 'Ubicación desconocida'}
          </Card.Subtitle>
          <Card.Text>{articulo.descripcion || 'Descripción no disponible.'}</Card.Text>

          <ListGroup className="list-group-flush mb-3">
            <ListGroup.Item>
              <i className="fa-solid fa-dollar-sign me-2"></i>
              {articulo.precio ? `$${articulo.precio}` : 'Precio no definido'}
            </ListGroup.Item>
            <ListGroup.Item>
              <i className="fa-solid fa-check me-2"></i>
              {articulo.estado || 'Estado desconocido'}
            </ListGroup.Item>
          </ListGroup>

          <div className="d-flex justify-content-center">
            <Button variant="outline-danger" className="rounded-pill px-4 shadow-sm">
              Contactar
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardProducto;
