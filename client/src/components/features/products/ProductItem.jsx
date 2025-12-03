import * as styles from './ProductItem.css'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

function ProductItem(product) {
  const { id, name, image, description, category, price, isAvailable, onSale } = product

  return (
    <Link to={`/store/product/${id}`}>
      <Card className={styles.productCard}>
        <Card.Img
          className={styles.imageBox}
          loading="lazy"
          src={image}
          alt={name}
        />
        <Card.Body className={styles.detailsBox}>
          <Card.Title >{name}</Card.Title>
          <Card.Text>${price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default ProductItem
