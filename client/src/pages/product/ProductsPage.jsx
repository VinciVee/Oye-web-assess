// import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query"
import { Link } from 'react-router-dom';
import { Container, ButtonToolbar, } from "react-bootstrap";

// Local modules
import useAuth from '../../hooks/useAuth';
import productService from '../../services/productService';
import ProductsList from "../../components/features/products/ProductsList"
import OyezLoader from '../../components/common/OyezLoader';
import OyezLink from '../../components/common/OyezLink'
import * as styles from './ProductsPage.css'

function ProductsPage() {
  const { user } = useAuth()

  // TanStack: Data Fetch onMount
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['products'], // note: be consistent with keys across you app
    queryFn: fetchProducts,
    retry: 0 // try once only, then give error message
  })

  // Fetch products function
  async function fetchProducts(){
    try {
      const response = await productService.getAll()
      console.log(response.data)
      return response.data  // until returned, isPending is true
      // setProducts(data)
    } catch(err) {
      throw err; // will be handled by useQuery
      // setError(true)
    } finally {
      // setLoading(false)
    }
  }

  // CONDITIONAL LOAD: LOADING
  if (isPending) {
    return (
      <Container className="text-center">
        <OyezLoader />
      </Container>
    )
  }

  // CONDITIONAL LOAD: ERROR
  if (isError) {
    return (
      <Container className="text-center mt-4">
        <p>Error: {error.message}</p>
        <Link to="/">Return to Home page</Link>
      </Container>
    )
  }

  return (
    <Container>
      <h1>Oyez Oyez Store</h1>
      <p>Products</p>

      <ButtonToolbar className='mb-3' aria-label='product list filter options' >
        <OyezLink to='/store/sales'>On Sale</OyezLink>
        { user &&
          <OyezLink to='/store/product/add'>Add Product</OyezLink>
        }
      </ButtonToolbar>

      <ProductsList products={products} />
    </Container>
  )
}

export default ProductsPage
