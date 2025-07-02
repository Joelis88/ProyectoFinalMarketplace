
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';






const NavBar = () => {
 
  return (
    <section>
    <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
      <Container fluid>
 
        <Navbar.Brand as={Link} to="/">ModaCircular</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        
       <div className="flex-grow-1 d-flex justify-content-center">
         <Form className="d-flex w-50 search-bar">
         <Form.Control
         type="search"
         placeholder="¿Qué estás buscando?"
         className="rounded-pill px-4 me-2 border-0 shadow-sm"
         aria-label="Search"
          />
        <Button variant="info" className="rounded-pill px-4">
          <i className="fa-solid fa-magnifying-glass"></i>
        </Button>
         </Form>
       </div>

     
          <Nav className="ms-auto d-flex align-items-center">
            <NavDropdown   className="no-caret" title={<i className="fa-solid fa-user fa-2x"></i>} id="navbarScrollingDropdown" align="end">
              <NavDropdown.Item as={Link} to="/login">Ingresa</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/register">Crea tu cuenta</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/account">Mi Perfil</NavDropdown.Item>
            </NavDropdown>

            <Link to="/publicar">
              <Button variant="outline-light" className="ms-3">Nueva publicación</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </section>
  )
}

export default NavBar