import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Local modules
import useAuth from '../../hooks/useAuth';
import productService from '../../services/productService';
import ProductsList from "../../components/features/products/ProductsList"
import OyezLoader from '../../components/common/OyezLoader';
import OyezLink from '../../components/common/OyezLink'
import * as styles from './OnSalePage.css'

function OnSalePage() {
  const { user } = useAuth()
  // PRODUCTS STATE
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchSaleProducts()
  }, [])

  // Fetch products function
  async function fetchSaleProducts(){
    try {
      const response = await productService.getOnSale()
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
        <Link to="/">Return to Home page</Link>
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
      <p>On sale products</p>
      <OyezLink to='/store/products'>All Products</OyezLink>

      <ProductsList products={products} />
    </Container>
  )
}

export default OnSalePage
