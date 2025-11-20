import { Button } from "react-bootstrap";
import ProductItem from "./ProductItem"

import * as styles from './ProductList.css'

function ProductsList({ products }) {

  return (
    <div className={styles.gridContainer}>
      <div className={styles.productList}>
        {products.length > 0 && products.map(product =>
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            description={product.description}
            price={product.price}
            category={product.category}
            onSale={product.onSale}
            isAvailable={product.isAvailable}
          />
        )}
      </div>
    </div>
  )
}

export default ProductsList
