import AddPost from "../components/post/AddPost";
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import ApiService from "../services/api";
import { useState } from "react";




const Post = () => {
  const { user } = useContext(UserContext); 
  const [articulos, setArticulos] = useState([]);
  const handleAgregarArticulo = async (nuevoArticulo) => {
    try {
      // Mapear los campos del formulario a los campos esperados por la API
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
        alert('¡Artículo publicado exitosamente!');
        setArticulos([response.data, ...articulos]);
      }
    } catch (error) {
      console.error('Error al publicar artículo:', error);
      alert('Error al publicar el artículo. Por favor, intenta nuevamente.');
    }
  };


  return (
    <Container className="my-5">
      <Stack gap={3} className="text-center">
        <div className="fs-4 fw-bold">🛍️ Artículo en Venta</div>
        {user ? (
          <div className="text-muted">
            <strong>{user?.first_name} {user?.last_name}</strong>
           
         
          </div>
        ) : (
          <div className="text-muted">Inicia sesión para publicar</div>
        )}
        <AddPost onAgregar={handleAgregarArticulo} />
      </Stack>
    </Container>
  );
};

export default Post;

