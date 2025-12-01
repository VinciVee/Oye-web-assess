import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

// Local modules
import * as styles from "./ProductDetail.css";
import useAuth from '../../hooks/useAuth';
import productService from '../../services/productService';
import OyezCard from '../../components/common/OyezCard';
import OyezLoader from '../../components/common/OyezLoader';
import OyezButton from '../../components/common/OyezButton';
import OyezLink from '../../components/common/OyezLink';

function ProductDetail() {
  // CUSTOM HOOKS
  const { user } = useAuth()
  const params = useParams()
  const navigate = useNavigate()

  // STATE INIT
  const [productData, setProductData] = useState({
    id: params.id,
    name: "",
    description: "",
    image: "",
    price: 0,
    category: "",
    isAvailable: true,
    onSale: false,
  });
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  // Destructure data state nested object properties
  const { id, name, description, image, price, category, isAvailable, onSale } = productData

  // HOOK: Prevention of useEffect calling TWICE (React v18)
  const effectRan = useRef(false)
  useEffect(() => {
    console.log("Effect Ran")
    if (effectRan.current === false) {
      fetchProduct()
      setLoading(false)

      // CLEAN UP FUNCTION
      return () => {
        console.log("Unmounted")
        effectRan.current = true
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // FUNCTIONS
  // [1] PAGE POPULATION
  async function fetchProduct() {
    try {
      const response = await productService.getProductById(id, image);
      const fetchedProduct = await response.data
      console.log(fetchedProduct)

      setProductData(productOnMount => ({...productOnMount, ...fetchedProduct}))

    } catch (err) {
      console.log(err?.response)
      setError(true)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await productService.deleteProduct(id)
      navigate('/store/products')
      // TO DO: Add confirmation / warning pop-up
    } catch (error) {
      // scrolls to top of page
      window.scroll({top: 0, left: 0, behavior: 'smooth' })
      setTimeout(() => {setLoading(false)}, 1000)
    }
  }

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return (
      <Container className="text-center">
        <p>Error page</p>
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

  return (
    <OyezCard title="Product Details">
      {/* MAIN PRODUCT SECTION */}
      <div className={styles.productBox}>
        {/* IMAGE BOX: LEFT */}
        <div className={styles.productBoxLeft}>
          <img className={styles.productWindow} src={image} alt={name} />
        </div>
        {/* TEXT & PURCHASE AREA: RIGHT */}
        <div className={styles.productBoxRight}>
          {/* HERO BOX */}
          <div className={styles.productHeroContainer}>
            <h2>{name}</h2>
            <p>{price}</p>
            <p>{description}</p>
          </div>

          {/* AUTH LINKS: EDIT & DELETE */}
          {user && <div>
            <OyezLink
              to={`/store/product/edit/${id}`}
            >Edit
            </OyezLink>
            <OyezButton
              onClick={handleDelete}
              loadingState={loading}
            >
              {loading ? <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> : 'Delete'}
            </OyezButton>
          </div>}
        </div>
      </div>
    </OyezCard>
  )
}

export default ProductDetail
