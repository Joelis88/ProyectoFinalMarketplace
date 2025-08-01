import "./post.css";
import { useState, useEffect } from "react";
import { Form, Button, Card, Container, Image } from "react-bootstrap";
// import { FaUpload } from "react-icons/fa";


const AddPost = ({ onAgregar, productoInicial = {}, modoEdicion = false }) => {

  const [formulario, setFormulario] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
    condition: "nuevo",
    location: "",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

 useEffect(() => {
  if (modoEdicion && productoInicial?.title) {
    setFormulario({
      title: productoInicial.title || "",
      description: productoInicial.description || "",
      price: productoInicial.price || "",
      category: productoInicial.category || "",
      image_url: productoInicial.image_url || "",
      condition: productoInicial.condition || "nuevo",
      location: productoInicial.location || "",
    });

    if (productoInicial.image_url) {
      setPreviewUrl(productoInicial.image_url);
      setImageUrl(productoInicial.image_url);
    }
  }
}, [productoInicial, modoEdicion]);


  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewUrl(reader.result);
  //       setImageUrl("");
  //       setFormulario((prev) => ({ ...prev, image_url: reader.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setFormulario((prev) => ({ ...prev, image_url: url }));
    setPreviewUrl(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAgregar(formulario);
  };

  const updateField = (field) => (value) =>
    setFormulario((prev) => ({ ...prev, [field]: value }));

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <Card style={{ width: "100%", maxWidth: "600px" }} className="p-4 shadow-sm">
        <Card.Title className="mb-4 text-center">
          {modoEdicion ? "Editar Artículo" : "Publica tu Artículo"}
        </Card.Title>

        <Form onSubmit={handleSubmit}>
         
          {/* <Form.Group className="mb-3 text-center">
            <Form.Label htmlFor="upload-image" className="btn btn-outline-secondary">
              <FaUpload className="me-2" /> Subir desde tu dispositivo
            </Form.Label>
            <Form.Control
              type="file"
              id="upload-image"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Form.Group> */}

         
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Pega una URL de imagen"
              value={imageUrl}
              onChange={handleUrlChange}
            />
          </Form.Group>

        
          {previewUrl && (
            <div className="text-center mb-3">
              <Image src={previewUrl} alt="Vista previa" fluid rounded style={{ maxHeight: "200px" }} />
            </div>
          )}

      
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Título del artículo"
              value={formulario.title}
              onChange={(e) => updateField("title")(e.target.value)}
            />
          </Form.Group>

       
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Precio"
              value={formulario.price}
              onChange={(e) => updateField("price")(e.target.value)}
            />
          </Form.Group>

          
          <Form.Group className="mb-3">
            <Form.Select
              value={formulario.category}
              onChange={(e) => updateField("category")(e.target.value)}
            >
              <option value="">Categoría</option>
              <option value="Mujer">Mujer</option>
              <option value="Hombre">Hombre</option>
              <option value="Niñ@s">Niñ@s</option>
              <option value="Accesorios">Accesorios</option>
            </Form.Select>
          </Form.Group>

   
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Ubicación"
              value={formulario.location}
              onChange={(e) => updateField("location")(e.target.value)}
            />
          </Form.Group>

      
          <Form.Group className="mb-3">
            <Form.Select
              value={formulario.condition}
              onChange={(e) => updateField("condition")(e.target.value)}
            >
              <option value="">Estado</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Usado">Usado</option>
            </Form.Select>
          </Form.Group>

         
          <Form.Group className="mb-4">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formulario.description}
              onChange={(e) => updateField("description")(e.target.value)}
            />
          </Form.Group>

       
          <div className="d-grid">
            <Button className="publish-button" type="submit">
              {modoEdicion ? "Actualizar Artículo" : "Publicar Artículo"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default AddPost;


