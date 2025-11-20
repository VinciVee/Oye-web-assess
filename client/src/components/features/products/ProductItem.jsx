import * as styles from './ProductItem.css'

function ProductItem(product) {
  const { id, name, image, description, category, price, onSale, isAvailable } = product

  return (
    <div className={styles.productItem}>
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
    </div>
  )
}

export default ProductItem
