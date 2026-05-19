import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <Navbar expand="lg" className="custom-navbar px-5">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-3">
          <div className="logo-box">📁</div>
          <h1 className="logo-text">Listify</h1>
        </Navbar.Brand>
        <Nav className="ms-auto gap-4 nav-links">
          <Nav.Link as={Link} to="/about">About us</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contacts</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header