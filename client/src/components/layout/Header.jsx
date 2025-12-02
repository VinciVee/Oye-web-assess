import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Container, Navbar, Nav } from "react-bootstrap";
import { RiShoppingCartFill } from 'react-icons/ri';

import * as styles from './Header.css';
import logoImg from '../../assets/images/oyez-oyez-logo.svg'
import useAuth from "../../hooks/useAuth"
import OyezLink from '../common/OyezLink';


const Header = () => {
  const { user, logout } = useAuth()
  // Hooks to control navbar collapse behaviour
  const [expanded, setExpanded] = useState(false)
  const navRef = useRef(null)

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Navbar
      className={styles.navbar}
      ref={navRef}
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      variant="light"
      collapseOnSelect
      expand="lg"
      sticky="top"
    >
      <Container>
        {/* NEW IMAGE LOGO & TEXT */}
        <Navbar.Brand className={styles.brandLink} as={Link} to='/'>
          <img className={styles.logo} src={logoImg} alt="oyez oyez logo" />
          <div className={styles.logoTextBox}>
            <span className={styles.brandTitle}>All things medieval</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
        <Navbar.Collapse id='responsive-navbar-nav'>
          {/* STANDARD NAVLINKS */}
          <Nav className='me-auto'>
            <Nav.Link
              className={styles.navLink}
              as={Link}
              to='/store/products'
              eventKey='products'
            >Products</Nav.Link>
          </Nav>
          {/* AUTH NAVLINKS */}
          <Nav className={styles.navMenu}>

            {/* LOGGED OUT */}
            {!user && <OyezLink to='/login'>Login</OyezLink>}
            {!user && <OyezLink to='/signup'>Sign Up</OyezLink>}

            {/* LOGGED IN */}
            {user && <Nav.Link className={styles.navLink} as={Link} to='/dashboard' eventKey='dashboard'>Dashboard</Nav.Link>}
            {user && <Nav.Link  className={styles.navLink} onClick={logout} eventKey='logout'>Logout</Nav.Link>}
            <button><RiShoppingCartFill /></button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
