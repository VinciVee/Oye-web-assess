import * as styles from './ProductItem.css'
import { Link } from 'react-router-dom'

function ProductItem(product) {
  const { id, name, image, description, category, price, isAvailable, onSale } = product

  return (
    <Link className={styles.productItem} to={`/store/product/${id}`}>
      <div>
        <img
          className={styles.imageCard}
          loading="lazy"
          src={image}
          alt={name}
        />
      </div>
      <div>
        <h4 className={styles.productName}>{name}</h4>
        <p>${price}</p>
      </div>
    </Link>
  )
}

export default ProductItem
