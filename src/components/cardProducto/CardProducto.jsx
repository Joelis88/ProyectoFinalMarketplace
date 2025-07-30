import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import "./CardProducto.css";

const CardProducto = ({ articulo, modoMisPublicaciones = false }) => {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useContext(UserContext);

  const [liked, setLiked] = useState(false);

  const esPropietario = user?.id === articulo.user_id;

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
  navigate(`/edit/${articulo.id}`);
};

  const handleEliminar = async () => {
  if (!confirm("¿Estás seguro de que deseas eliminar este artículo?")) return;

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3001/api/products/${articulo.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (res.ok) {
      alert("Producto eliminado exitosamente");
      window.location.reload();
    } else {
      alert(data.error || "No se pudo eliminar");
    }
  } catch (err) {
    console.error("Error al eliminar:", err);
    alert("Ocurrió un error");
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
        <Link to={`/products/${articulo.id}`} className="text-decoration-none text-dark">
          <Card.Img
            variant="top"
            src={articulo.image_url || "https://placehold.co/300x300"}
            alt={articulo.title}
            style={{ height: "200px", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>{articulo.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <i className="fa-solid fa-location-dot me-1"></i>
              {articulo.location}
            </Card.Subtitle>
            <Card.Text>{articulo.description}</Card.Text>
            <ListGroup className="list-group-flush mb-3">
              <ListGroup.Item>
                <i className="fa-solid fa-dollar-sign me-2"></i>{formatPrice(articulo.price)}
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="fa-solid fa-check me-2"></i>{articulo.condition}
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
              to={`/products/${articulo.user_id}`}
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
