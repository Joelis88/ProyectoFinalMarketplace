import "./post.css";
import { useState } from 'react';
import { Form, Button, Card, Container, Image } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';

function AddPost({ onAgregar }) {
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [estado, setEstado] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoArticulo = {
      imagen: previewUrl,
      titulo,
      precio,
      ubicacion,
      estado,
      descripcion,
      categoria
    };

    onAgregar(nuevoArticulo);

    // Limpiar formulario
    setImageUrl('');
    setPreviewUrl(null);
    setTitulo('');
    setPrecio('');
    setUbicacion('');
    setEstado('');
    setDescripcion('');
    setCategoria('');
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setPreviewUrl(url);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setImageUrl('');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <Card style={{ width: '100%', maxWidth: '600px' }} className="p-4 shadow-sm">
        <Card.Title className="mb-4 text-center">Publica tu artículo</Card.Title>

        <Form onSubmit={handleSubmit}>
          {/* SUBIDA DE IMAGEN */}
          <Form.Group className="mb-3 text-center">
            <Form.Label htmlFor="upload-image" className="btn btn-outline-secondary">
              <FaUpload className="me-2" /> Subir desde tu dispositivo
            </Form.Label>
            <Form.Control
              type="file"
              id="upload-image"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </Form.Group>

          {/* URL DE IMAGEN */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="O pega una URL de imagen"
              value={imageUrl}
              onChange={handleUrlChange}
            />
          </Form.Group>

          {/* PREVIEW */}
          {previewUrl && (
            <div className="text-center mb-3">
              <Image src={previewUrl} alt="Vista previa" fluid rounded style={{ maxHeight: '200px' }} />
            </div>
          )}

          {/* TITULO */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Título del artículo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </Form.Group>

          {/* PRECIO */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </Form.Group>

          {/* CATEGORIA */}
          <Form.Group className="mb-3">
            <Form.Select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Categoría</option>
              <option value="Mujer">Mujer</option>
              <option value="Hombre">Hombre</option>
              <option value="Niñ@s">Niñ@s</option>
              <option value="Accesorios">Accesorios</option>
            </Form.Select>
          </Form.Group>

          {/* UBICACIÓN */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Ubicación"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            />
          </Form.Group>

          {/* ESTADO */}
          <Form.Group className="mb-3">
            <Form.Select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="">Estado</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Usado">Usado</option>
            </Form.Select>
          </Form.Group>

          {/* DESCRIPCIÓN */}
          <Form.Group className="mb-4">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Form.Group>

          {/* BOTÓN */}
          <div className="d-grid">
            <Button className="publish-button" type="submit">
              Publicar
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default AddPost;

