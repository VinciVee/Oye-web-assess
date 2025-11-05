import { Button } from "react-bootstrap";
import ProductItem from "./ProductItem"

import * as styles from './ProductList.css'

function ProductsList(props) {
  const { products, onAddProduct, onRemoveProduct } = props;
  return (
    <div>
      <div className="my-3">
        <Button onClick={() => onAddProduct("NEW!")} variant="info" type="button">Add to Cart</Button>
      </div>
      <div className={styles.productList}>
        {products.length === 0 && <p>Empty cart...</p>}
        {products.length > 0 && products.map(product =>
          <ProductItem
            key={product.id}
            product={product}
            onRemoveProduct={onRemoveProduct}
          />
        )}
      </div>
    </div>
  )
}

export default ProductsList
