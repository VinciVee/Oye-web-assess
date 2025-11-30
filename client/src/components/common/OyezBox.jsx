import OyezLink from '../common/OyezLink'
import * as styles from './OyezBox.css'

function OyezBox(props) {
  const { title, text, buttonPath, buttonText } = props

  return (
    <div className={styles.oyezBox}>
      <h1 className={styles.titleText}>{title}</h1>
        <p className={styles.bodyText}>{text}</p>
        <OyezLink to={buttonPath}>{buttonText}</OyezLink>
    </div>
  )
}

export default OyezBox
