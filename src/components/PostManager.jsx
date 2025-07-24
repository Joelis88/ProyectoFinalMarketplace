import { useState, useEffect, useContext } from 'react';
import AddPost from "../components/post/AddPost";
import CardProducto from "../components/cardProducto/CardProducto";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ApiService from "../services/api"; 
import { UserContext } from '../context/UserContext';

const PostManager = () => {
  const [articulos, setArticulos] = useState([]);
  const { user} = useContext(UserContext);


  const fetchArticulos = async () => {
    try {
      const response = await ApiService.getProducts(); 
      setArticulos(response.data);
    } catch (error) {
      console.error("Error al cargar artículos:", error);
    }
  };

  useEffect(() => {
    fetchArticulos();
  }, []);


  const handleAgregarArticulo = async (nuevoArticulo) => {
    try {
      const productData = {
        title: nuevoArticulo.title,
        description: nuevoArticulo.description,
        price: parseFloat(nuevoArticulo.price),
        category: nuevoArticulo.category.toLowerCase(),
        image_url: nuevoArticulo.image_url,
        condition: nuevoArticulo.condition.toLowerCase(),
        location: nuevoArticulo.location, 
        vendedor: user.id 
      };

      const response = await ApiService.createProduct(productData);

      if (response.data) {
        alert("¡Artículo publicado exitosamente!");
        fetchArticulos(); 
      }
    } catch (error) {
      console.error("Error al agregar artículo:", error);
      alert("Hubo un error al publicar el artículo");
    }
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


