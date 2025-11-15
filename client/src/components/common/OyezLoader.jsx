import Spinner from 'react-bootstrap/Spinner'

import * as styles from './OyezLoader.css'

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
