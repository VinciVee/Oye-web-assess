import Spinner from 'react-bootstrap/Spinner'

import * as styles from './OyezLoader.css'

/**
 * Used to style bootstrap Spinner
 *
 */
function OyezLoader() {
  return (
    <div className={styles.loadingBox}>
      <Spinner
        className={styles.loadingSpinner}
        animation="border"
      />
    </div>
  )
}

export default OyezLoader
