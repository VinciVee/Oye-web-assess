//
import * as styles from './Header.css';
import logoImg from '../../assets/images/oye-oye-logo.svg'

// Import Bootstrap modules
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from "react-bootstrap";
import { RiShoppingCartFill } from 'react-icons/ri';

const Header = () => {
  return (
    <Navbar className={styles.navbar} variant="light" expand="lg" sticky="top">
      <Container>
        {/* NEW IMAGE LOGO & TEXT */}
        <Navbar.Brand className={styles.brandLink} as={Link} to='/'>
          <img className={styles.logo} src={logoImg} alt="oye oye logo" />
          <div className={styles.logoTextBox}>
            <span className={styles.brand}>Title</span>
            {/* <span className={styles.brandSub}>The Official Online Store</span> */}
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          {/* STANDARD NAVLINKS */}
          <Nav className='me-auto'>
            <Nav.Link className={styles.navLink} as={Link} to='/store/products'>Products</Nav.Link>
          </Nav>
          <Nav className={styles.navMenu}>
          {/* AUTH NAVLINKS */}
            <Nav.Link className={styles.navLink} as={Link} to='/dashboard'>Dashboard</Nav.Link>
            <Nav.Link className={styles.navLink} as={Link} to='/login'>Login</Nav.Link>
            <Nav.Link className={styles.navLink} as={Link} to='/signup'>Sign Up</Nav.Link>
            <button><RiShoppingCartFill /></button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
