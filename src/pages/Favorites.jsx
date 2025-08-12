import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import CardProducto from '../components/cardProducto/CardProducto';
import {Container, Row, Col, Alert} from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import ApiService from "../services/ApiService";

const Favorites = () => {
   const { logout } = useContext(UserContext);
  const { isAuthenticated } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated) {
    
        
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await ApiService.getFavorites();
        setFavorites(response.data || []);
      } catch (err) {
        console.error("Error obteniendo favoritos:", err);
        setError("Error al cargar los favoritos");
        
       
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Container className="my-5">
        <Alert variant="warning">
          <Alert.Heading>Inicia sesión para ver tus favoritos</Alert.Heading>
          <p>
            Para poder guardar y ver tus productos favoritos, necesitas iniciar sesión en tu cuenta.
          </p>
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container fluid className="mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando tus favoritos...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-5">
      <Row className="align-items-start mb-5">
        <Col md={2} className="px-4">
          <Sidebar onLogout={logout} />
        </Col>

        <Col md={10}>
    <Container>
      <h1 className="mb-4">
        <i className="fas fa-heart text-danger me-2"></i>
        Mis Favoritos
      </h1>
      
      {favorites.length === 0 ? (
        <Alert variant="info">
          <Alert.Heading>No tienes favoritos aún</Alert.Heading>
          <p>
            Explora nuestros productos para agregar tus favoritos.
          </p>
        </Alert>
      ) : (
        <>
          <p className="text-muted mb-4">
            Tienes {favorites.length} producto{favorites.length !== 1 ? 's' : ''} en favoritos
          </p>
          <Row className="g-4">
            {favorites.map((producto) => (
              <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
                <CardProducto articulo={producto} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
    </Col>
    </Row>
    </Container>
  );
};

export default Favorites;
