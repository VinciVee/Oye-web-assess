import Spinner from 'react-bootstrap/Spinner'

import * as styles from './TuLoader.css'

function TuLoader() {
  return (
    <div className={styles.loadingBox}>
      <Spinner
        className={styles.loadingSpinner}
        animation="border"
      />
    </div>
  )
}

export default TuLoader
