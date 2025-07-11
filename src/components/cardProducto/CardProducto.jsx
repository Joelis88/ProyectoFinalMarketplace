import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "./CardProducto.css";

const CardProducto = ({ articulo, modoMisPublicaciones = false }) => {
  const { user, isAuthenticated } = useContext(UserContext);

  const [liked, setLiked] = useState(false);

  const esPropietario = user?.nombre === articulo.vendedor;

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setLiked(favoritos.includes(articulo.id));
  }, [articulo.id]);

  const toggleLike = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const nuevosFavoritos = liked
      ? favoritos.filter((id) => id !== articulo.id)
      : [...favoritos, articulo.id];

    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    setLiked(!liked);
  };

  const handleEditar = () => {
    alert(`Editar producto: ${articulo.titulo}`);
  };

  const handleEliminar = () => {
    if (confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
      alert(`Eliminar producto: ${articulo.titulo}`);
    }
  };

  return (
    <div className="card-container" style={{ position: "relative", width: "18rem" }}>
      {isAuthenticated && !modoMisPublicaciones && !esPropietario && (
  <div className="heart-icon" onClick={toggleLike}>
       <i className={`${liked ? 'fas' : 'far'} fa-heart`}></i>
  </div>
)}

      <Card className="shadow-sm">
        <Link to={`/producto/${articulo.id}`} className="text-decoration-none text-dark">
          <Card.Img
            variant="top"
            src={articulo.imagen || "https://via.placeholder.com/300"}
            alt={articulo.titulo}
            style={{ height: "200px", objectFit: "cover" }}
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
                <i className="fa-solid fa-dollar-sign me-2"></i>${articulo.precio}
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="fa-solid fa-check me-2"></i>{articulo.estado}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Link>

        <div className="d-flex justify-content-center gap-2 mb-3">
          {modoMisPublicaciones ? (
            <>
              <Button
                variant="outline-dark"
                size="sm"
                className="rounded-pill px-3 d-flex align-items-center gap-2"
                onClick={handleEditar}
              >
                <i className="fa-solid fa-pen-to-square"></i> Editar
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                className="rounded-pill px-3 d-flex align-items-center gap-2"
                onClick={handleEliminar}
              >
                <i className="fa-solid fa-trash"></i> Eliminar
              </Button>
            </>
          ) : isAuthenticated && !esPropietario ? (
            <Link
              to={`/producto/${articulo.id}`}
              className="btn btn-outline-danger rounded-pill px-4 shadow-sm"
            >
              Contactar
            </Link>
          ) : null}
        </div>
      </Card>
    </div>
  );
};

export default CardProducto;
