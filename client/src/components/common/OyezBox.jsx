import * as styles from './OyezBox.css'

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function OyezBox(props) {
  const { title, text, shopPath } = props

  return (
    <div className={styles.oyezBox}>
      <h1 className={styles.titleText}>{title}</h1>
        <p className={styles.bodyText}>{text}</p>
      <Link className={styles.buttonStyle} to={shopPath}>
        <Button variant="info">Shop Now</Button>
      </Link>
    </div>
  )
}

export default OyezBox
