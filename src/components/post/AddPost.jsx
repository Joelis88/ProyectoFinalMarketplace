import "./post.css";
import { useState } from 'react';
import { Form, Button, Card, Container, Image } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";



function AddPost({ onAgregar }) {
  const { user } = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, settitle] = useState('');
  const [price, setprice] = useState('');
  const [location, setlocation] = useState('');
  const [condition, setcondition] = useState('');
  const [description, setdescription] = useState('');
  const [category, setcategory] = useState('');
  // const [vendedor, setVendedor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData  = {
      image_url: previewUrl,
      title,
      price,
      location,
      condition,
      description,
      category,
      vendedor: user?.nombre || "Anónimo",
      email: user?.email || ""
    };

    onAgregar(productData);

    // Limpiar formulario
    setImageUrl('');
    setPreviewUrl(null);
    settitle('');
    setprice('');
    setlocation('');
    setcondition('');
    setdescription('');
    setcategory('');
   
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

  console.log('AddPost props:', { onAgregar });

useEffect(() => {
  if (typeof onAgregar !== 'function') {
    console.error('Prop onAgregar no es función');
  }
}, []);

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <Card style={{ width: '100%', maxWidth: '600px' }} className="p-4 shadow-sm">
        <Card.Title className="mb-4 text-center">Publica tu artículo</Card.Title>

        <Form onSubmit={handleSubmit}>
          {/* SUBIDA DE image_url */}
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

          {/* URL DE image_url */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="O pega una URL de image_url"
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

          {/* title */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Título del artículo"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </Form.Group>

          {/* price */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="precio"
              value={price}
              onChange={(e) => setprice(e.target.value)}
            />
          </Form.Group>

          {/* category */}
          <Form.Group className="mb-3">
            <Form.Select
              value={category}
              onChange={(e) => setcategory(e.target.value)}
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
              value={location}
              onChange={(e) => setlocation(e.target.value)}
            />
          </Form.Group>

          {/* condition */}
          <Form.Group className="mb-3">
            <Form.Select
              value={condition}
              onChange={(e) => setcondition(e.target.value)}
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
              value={description}
              onChange={(e) => setdescription(e.target.value)}
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

