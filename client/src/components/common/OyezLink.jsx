import { Link } from 'react-router-dom'
import * as styles from './OyezLink.css'

function OyezLink({ to, children }) {
  return (
    <Link
      className={styles.oyezLink}
      to={to}
    >
      {children}
    </Link>
  )
}

export default OyezLink
