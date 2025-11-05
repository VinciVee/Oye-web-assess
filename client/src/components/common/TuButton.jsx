import * as styles from './TuButton.css'
import { Button } from "react-bootstrap";

function TuButton(props) {
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

export default TuButton
