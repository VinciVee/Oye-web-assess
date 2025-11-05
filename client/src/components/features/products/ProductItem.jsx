import TuButton from '../../common/TuButton';

import * as styles from './ProductItem.css'

function ProductItem(props) {
  const { product, onRemoveProduct } = props;
  return (
    <div className={styles.productItem}>
      <div>
        <img
          className={styles.imageCard}
          loading="lazy"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div>
        <h4 className={styles.productName}>{product.name}</h4>
        <TuButton
          key={product.id}
          product={product}
          onRemoveProduct={onRemoveProduct}
        >
        </TuButton>
      </div>
    </div>
  )
}

export default ProductItem
