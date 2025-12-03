import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Container, Navbar, Nav } from "react-bootstrap";
import { RiShoppingCartFill } from 'react-icons/ri';

import * as styles from './Header.css';
import logoImg from '../../assets/images/oyez-oyez-logo.svg'
import useAuth from "../../hooks/useAuth"
import OyezLink from '../common/OyezLink';
import OyezButton from '../common/OyezButton'


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
    <header>
      <Navbar
        ref={navRef}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        collapseOnSelect
        expand="lg"
        fixed="top"
      >
        <Container className={styles.navContainer}>
          {/* IMAGE LOGO & TEXT */}
          <Navbar.Brand className={styles.navbarBrand} >
            <Link to='/'>
              <img className={styles.logo} src={logoImg} alt="oyez oyez logo" />
            </Link>
            <span className={styles.brandTitle}>All things medieval</span>
          </Navbar.Brand>

          {/* LINKS */}
          <Navbar.Toggle aria-controls='responsive-navbar-nav' className={styles.toggleButton}/>
          <Navbar.Collapse id='responsive-navbar-nav'>
            {/* AUTH NAVLINKS */}
            <Nav className={styles.navMenu}>
              {/* STANDARD NAVLINKS */}
              <OyezLink to='/store/products'>Products</OyezLink>

              {/* LOGGED OUT */}
              {!user && <OyezLink to='/login'>Login</OyezLink>}
              {!user && <OyezLink to='/signup'>Sign Up</OyezLink>}

              {/* LOGGED IN */}
              {user && <OyezLink to='/dashboard'>Dashboard</OyezLink>}
              {user && <OyezButton onClick={logout}>Logout</OyezButton>}
            </Nav>

            {/* CART */}
            <OyezButton><RiShoppingCartFill /></OyezButton>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <img
        src="/src/assets/images/ani-adigyozalyan-hero-unsplash.webp"
        alt='a hill'
        className={styles.heroDiv}
      />
    </header>
  )
}

export default Header;
