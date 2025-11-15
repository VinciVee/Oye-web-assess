//
import * as styles from './Header.css';
import logoImg from '../../assets/images/oyez-oyez-logo.svg'
import { useAuth } from '../../contexts/AuthContext';

// Import Bootstrap modules
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from "react-bootstrap";
import { RiShoppingCartFill } from 'react-icons/ri';
import OyezButton from '../common/OyezButton';

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <Navbar className={styles.navbar} variant="light" expand="lg" sticky="top">
      <Container>
        {/* NEW IMAGE LOGO & TEXT */}
        <Navbar.Brand className={styles.brandLink} as={Link} to='/'>
          <img className={styles.logo} src={logoImg} alt="oyez oyez logo" />
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
          {/* AUTH NAVLINKS */}
          <Nav className={styles.navMenu}>

            {/* LOGGED OUT */}
            {!user && <Nav.Link className={styles.navLink} as={Link} to='/login'>Login</Nav.Link>}
            {!user && <Nav.Link className={styles.navLink} as={Link} to='/signup'>Sign Up</Nav.Link>}

            {/* LOGGED IN */}
            {user && <Nav.Link className={styles.navLink} as={Link} to='/dashboard'>Dashboard</Nav.Link>}
            {user && <OyezButton onClick={logout} outline navbar>Logout</OyezButton>}
            <button><RiShoppingCartFill /></button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
