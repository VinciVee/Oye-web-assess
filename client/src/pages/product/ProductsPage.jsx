import { useState, useEffect } from 'react';
import ProductsList from "../../components/features/products/ProductsList"
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import productService from '../../services/productService';
import Container from "react-bootstrap/Container";
import OyezLoader from '../../components/common/OyezLoader';
import { Button } from 'react-bootstrap';
import * as styles from './ProductsPage.css'

function ProductsPage() {
  const { user } = useAuth()
  // PRODUCTS STATE
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  // Fetch products function
  async function fetchProducts(){
    try {
      const response = await productService.getAll()
      const data = await response.data
      // console.log(data)
      setProducts(data)

    } catch(err) {
      setError(true)

    } finally {
      setLoading(false)
    }
  }

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return (
      <Container className="text-center mt-4">
        <p>Error loading page ...</p>
        {/* <Link to="/">Return to Home page</Link> */}
      </Container>
    )
  }

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return (
      <Container className="text-center">
        <OyezLoader />
      </Container>
    )
  }

  // PRODUCTS FUNCTIONS

  return (
    <Container>
      <h1>Oyez Oyez Store</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates obcaecati dolore deleniti ex ipsa laudantium, mollitia laborum saepe aut autem.</p>

      { user &&
        <Button as='Link' to='/store/product/add' className={styles.navlink}>Add Product</Button>}

      <ProductsList products={products} />
    </Container>
  )
}

export default ProductsPage
