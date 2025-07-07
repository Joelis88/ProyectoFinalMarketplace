import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./CardProducto.css";

const CardProducto = ({ articulo }) => {
  const [liked, setLiked] = useState(false);

  // Revisar si el artículo ya está en favoritos
  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    setLiked(favoritos.includes(articulo.id));
  }, [articulo.id]);

  // Alternar favorito
  const toggleLike = () => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    let nuevosFavoritos;

    if (liked) {
      nuevosFavoritos = favoritos.filter(id => id !== articulo.id);
    } else {
      nuevosFavoritos = [...favoritos, articulo.id];
    }

    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    setLiked(!liked);
  };

  return (
    <div className="card-container" style={{ position: 'relative', width: '18rem' }}>
      <div className="heart-icon" onClick={toggleLike}>
        <i className={`fa${liked ? 's' : 'r'} fa-heart`}></i>
      </div>

      <Link to={`/producto/${articulo.id}`} className="text-decoration-none text-dark">
        <Card className="shadow-sm">
          <Card.Img
            variant="top"
            src={articulo.imagen || 'https://via.placeholder.com/300'}
            alt={articulo.titulo}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title>{articulo.titulo}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <i className="fa-solid fa-location-dot me-1"></i>
              {articulo.ubicacion}
            </Card.Subtitle>
            <Card.Text>{articulo.descripcion}</Card.Text>

            <ListGroup className="list-group-flush mb-3">
              <ListGroup.Item>
                <i className="fa-solid fa-dollar-sign me-2"></i>
                ${articulo.precio}
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="fa-solid fa-check me-2"></i>
                {articulo.estado}
              </ListGroup.Item>
            </ListGroup>

            <div className="d-flex justify-content-center">
              <Button variant="outline-danger" className="rounded-pill px-4 shadow-sm">
                Contactar
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default CardProducto;
