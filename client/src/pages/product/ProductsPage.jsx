import { useState, useEffect } from 'react';
import ProductsList from "../../components/features/products/ProductsList"

import productService from '../../services/productService';
import Container from "react-bootstrap/Container";
import OyezLoader from '../../components/common/OyezLoader';

function ProductsPage() {
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
      <ProductsList products={products} />
    </Container>
  )
}

export default ProductsPage
