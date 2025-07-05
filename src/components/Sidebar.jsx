import { Nav } from "react-bootstrap"

const Sidebar = ({ onLogout }) => {
  return (
    <div
      className="bg-light rounded-4 shadow-sm py-4"
      style={{ minHeight: "90vh" }}
    >
      <Nav className="flex-column">
        <Nav.Link href="/profile" className="text-dark mb-2">
          <i className="fa-solid fa-circle-user me-2"></i> Mi cuenta
        </Nav.Link>
        <Nav.Link href="/publicaciones" className="text-dark mb-2">
          <i className="fa-solid fa-clipboard me-2"></i> Mis publicaciones
        </Nav.Link>
        <Nav.Link href="/interesados" className="text-dark mb-2">
          <i className="fa-solid fa-envelope me-2"></i> Interesados
        </Nav.Link>
        <Nav.Link href="/favoritos" className="text-dark mb-2">
          <i className="fa-solid fa-heart me-2"></i> Favoritos
        </Nav.Link>
        <Nav.Link
          href="/logout"
          className="text-danger mt-3"
          onClick={onLogout}
        >
          <i className="fa-solid fa-power-off me-2"></i> Cerrar sesión
        </Nav.Link>
      </Nav>
    </div>
  )
}

export default Sidebar