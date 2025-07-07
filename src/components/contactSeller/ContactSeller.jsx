import { Card, Form, Button } from 'react-bootstrap';
import './ContactSeller.css'; 

function ContactSeller({ vendedor }) {
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
            <Button type="submit" className="btn-personalizado">
              Enviar mensaje
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ContactSeller;


