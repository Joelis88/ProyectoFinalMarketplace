import AddPost from "../components/post/AddPost";
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";




const Post = () => {
  const { user } = useContext(UserContext); 

  return (
    <Container className="my-5">
      <Stack gap={3} className="text-center">
        <div className="fs-4 fw-bold">🛍️ Artículo en Venta</div>
        {user ? (
          <div className="text-muted">
            <strong>{user.nombre} {user.apellido}</strong>
           
         
          </div>
        ) : (
          <div className="text-muted">Inicia sesión para publicar</div>
        )}
        <AddPost />
      </Stack>
    </Container>
  );
};

export default Post;

