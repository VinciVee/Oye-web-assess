import * as styles from './OyeButton.css'
import { Button } from "react-bootstrap";

function OyeButton(props) {
  const { onRemoveProduct, product } = props

  return (
    <Button
      onClick={() => onRemoveProduct(product.id)}
      variant="outline-danger"
      size="sm"
      type="button"
    >Remove from Cart</Button>
  )
}

export default OyeButton
