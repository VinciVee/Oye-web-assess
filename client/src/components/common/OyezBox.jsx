import OyezLink from '../common/OyezLink'
import * as styles from './OyezBox.css'

/**
 * Box component used to display text and links on homepage
 *
 * @param {*} props
 * @returns
 */
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
