import Spinner from 'react-bootstrap/Spinner'

import * as styles from './OyeLoader.css'

function OyeLoader() {
  return (
    <div className={styles.loadingBox}>
      <Spinner
        className={styles.loadingSpinner}
        animation="border"
      />
    </div>
  )
}

export default OyeLoader
