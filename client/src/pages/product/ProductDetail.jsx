import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()

  // QueryState
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id)
  })

  // STATE INIT
  // const [productData, setProductData] = useState({
  //   id: params.id,
  //   name: "",
  //   description: "",
  //   image: "",
  //   price: 0,
  //   category: "",
  //   isAvailable: true,
  //   onSale: false,
  // });
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(false)
  // Destructure data state nested object properties
  // const { name, description, image, price, category, isAvailable, onSale } = productData

  // HOOK: Prevention of useEffect calling TWICE (React v18)
  // const effectRan = useRef(false)
  // useEffect(() => {
  //   console.log("Effect Ran")
  //   if (effectRan.current === false) {
  //     fetchProduct()
  //     setLoading(false)

  //     // CLEAN UP FUNCTION
  //     return () => {
  //       console.log("Unmounted")
  //       effectRan.current = true
  //     }
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id])

  // FUNCTIONS
  // [1] PAGE POPULATION
  async function fetchProduct(productId) {
    try {
      const response = await productService.getProductById(productId);
      console.log(response.data)
      return response.data

      // setProductData(productOnMount => ({...productOnMount, ...fetchedProduct}))

    } catch (err) {
      throw err
      // console.log(err?.response)
      // setError(true)
    }
  }

  const deleteProduct = async () => {
    try {
      const response = await productService.deleteProduct(id)
      console.log(response)
      return response
      // TO DO: Add confirmation / warning pop-up
    } catch (err) {
      // scrolls to top of page
      window.scroll({top: 0, left: 0, behavior: 'smooth' })
      throw err
    }
  }
  // const deleteProduct = async (e) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   try {
  //     const response = await productService.deleteProduct(id)

  //     setLoading(false)
  //     navigate('/store/products')
  //     // TO DO: Add confirmation / warning pop-up
  //   } catch (error) {
  //     setError(true)
  //     // scrolls to top of page
  //     window.scroll({top: 0, left: 0, behavior: 'smooth' })
  //     setTimeout(() => {setLoading(false)}, 1000)
  //   }
  // }

  // Mutation query
  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // Commands to execute after successfully deleting the product + invalidate products
      queryClient.invalidateQueries({ queryKey: ['products'] })
      navigate('/store/products')
    }
  })

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

  // Destructure data state nested object properties
  const { name, description, image, price, category, isAvailable, onSale } = data

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
              onClick={(e) => {
                e.preventDefault()
                mutation.mutate()
              }}
              loadingState={mutation.isPending}
            >
              {mutation.isPending ? <Spinner
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
