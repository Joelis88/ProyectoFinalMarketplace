import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import AddPostForm from "../components/post/AddPost"; 
import { UserContext } from "../context/UserContext";




const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3001/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setProducto(data.data);
        } else {
          alert(data.error || "Error al cargar producto");
        }
      } catch (err) {
        console.error("Error cargando producto:", err);
        alert("Error al cargar el producto");
      } finally {
        setCargando(false);
      }
    };

    obtenerProducto();
  }, [id]);

  const handleActualizar = async (datosActualizados) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...datosActualizados,
          price: parseFloat(datosActualizados.price),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Producto actualizado correctamente");
        navigate("/publicaciones");
      } else {
        alert(data.error || "Error al actualizar producto");
      }
    } catch (err) {
      console.error("Error actualizando:", err);
      alert("Error en la solicitud");
    }
  };

  if (cargando) return <p className="text-center mt-5">Cargando producto...</p>;

  if (!producto) return <p className="text-center mt-5">Producto no encontrado</p>;

  return (
    <Container className="my-5">
      <Stack gap={3} className="text-center">
        <h2> Editar Publicación</h2>
        <AddPostForm productoInicial={producto} onAgregar={handleActualizar} modoEdicion />
      </Stack>
    </Container>
  );
};

export default EditPost;
