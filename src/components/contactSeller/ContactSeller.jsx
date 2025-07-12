import { Card, Form } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext'
import './ContactSeller.css'; 

function ContactSeller({ vendedor, email }) {
  const {  isAuthenticated } = useContext(UserContext);
  const getIniciales = (nombre) => {
    if (!nombre) return '';
    const partes = nombre.trim().split(' ');
    const iniciales = partes.slice(0, 2).map(p => p[0].toUpperCase()).join('');
    return iniciales;
  };

  const iniciales = getIniciales(vendedor);

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

        <Form>
          <Form.Group className="mb-3" controlId="formMensaje">
            <Form.Label className="fw-semibold">Enviar mensaje</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Escribe tu mensaje aquí"
              className="shadow-sm"
            />
          </Form.Group>
          <div className="d-grid">
  <a
    href={
      isAuthenticated
        ? `mailto:${email}?subject=Interesado%20en%20tu%20publicación&body=Hola%20${vendedor},%20me%20interesa%20tu%20artículo.`
        : undefined
    }
    className={`btn btn-personalizado text-white text-center ${!isAuthenticated ? 'disabled' : ''}`}
    style={{ textDecoration: 'none', pointerEvents: isAuthenticated ? 'auto' : 'none' }}
  >
    {isAuthenticated ? 'Enviar mensaje' : 'Inicia sesión para enviar'}
  </a>
</div>


          
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ContactSeller;


