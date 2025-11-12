import * as styles from './OyeBox.css'

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function OyeBox(props) {
  const { title, text, shopPath } = props

  return (
    <div className={styles.oyeBox}>
      <h1 className={styles.titleText}>{title}</h1>
        <p className={styles.bodyText}>{text}</p>
      <Link className={styles.buttonStyle} to={shopPath}>
        <Button variant="info">Shop Now</Button>
      </Link>
    </div>
  )
}

export default OyeBox
