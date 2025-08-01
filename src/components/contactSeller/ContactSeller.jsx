import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext'
import ApiService from '../../services/ApiService'
import './ContactSeller.css'; 

function ContactSeller({ vendedor, productId }) {
  const { isAuthenticated} = useContext(UserContext);
  const [mensaje, setMensaje] = useState('');
  const [status, setStatus] = useState(null);
  
 const getIniciales = (nombreCompleto) => {
  if (!nombreCompleto || typeof nombreCompleto !== 'string') return '';
  const partes = nombreCompleto.trim().split(' ');
  return partes.slice(0, 2).map(p => p[0]?.toUpperCase() || '').join('');
};

  const iniciales = getIniciales(vendedor);

  const handleEnviarMensaje = async (e) => {
    e.preventDefault();

    if (!mensaje.trim()) return;

    try {
    
      await ApiService.createNotification({
        product_id: productId,
        message: mensaje
      });

      
      // window.location.href = `mailto:${email}?subject=Interesado en tu publicación "${productTitle}"&body=${mensaje}`;

      setStatus('Mensaje enviado');
      setMensaje('');
    } catch (err) {
      console.error(err);
      setStatus('Hubo un error al enviar el mensaje');
    }
  };

  return (
    <Card className="shadow-sm mt-4" style={{ width: '100%', borderRadius: '0.75rem' }}>
      <Card.Body>
        <div className="mb-2 text-muted fw-semibold">Vendedor</div>

        <div className="d-flex align-items-center mb-4">
          <div className="avatar-iniciales me-3">
            {iniciales}
          </div>
          <div className="fw-bold fs-5">{vendedor}</div>
        </div>

        {status && <Alert variant="info">{status}</Alert>}

        <Form onSubmit={handleEnviarMensaje}>
          <Form.Group className="mb-3" controlId="formMensaje">
            <Form.Label className="fw-semibold">Enviar mensaje</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Escribe tu mensaje aquí"
              className="shadow-sm"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-grid">
            <Button 
              type="submit" 
              className="btn btn-personalizado text-white"
              disabled={!isAuthenticated}>
              {isAuthenticated ? 'Enviar mensaje' : 'Inicia sesión para enviar'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ContactSeller;