import { Outlet } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import { Container } from 'react-bootstrap';

import * as styles from './Layout.css' // Import everything from this file (*) and store it in an object called 'styles'
import Header from './Header'
import Footer from './Footer'

const Layout = () => (
  <div className={styles.app}>
    {/* TOAST is a popup component to display Errors */}
    <ToastContainer
      style={{ textAlign: "center" }}
      position='top-center'
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      transition={Slide}
      theme="colored"
    />
    <Header />
    {/* Wrap all content in column-direction flexbox */}
    <main>
      {/* {props.children} */}
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout
