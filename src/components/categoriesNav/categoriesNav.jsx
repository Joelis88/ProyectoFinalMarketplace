import "./categoriesNav.css";
import Nav from 'react-bootstrap/Nav';


function CategoriesNav() {
  return (
    <Nav defaultActiveKey="/home" as="ul"className="nav2">
      <Nav.Item as="li">
        <Nav.Link href="/mujer">Mujer</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/hombre">Hombre</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/niños">Niñ@s</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/ofertas">Accesorios</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default CategoriesNav;