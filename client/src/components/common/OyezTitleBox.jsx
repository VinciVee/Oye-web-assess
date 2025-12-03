import * as styles from './OyezTitleBox.css'

function OyezTitleBox({title, text, children}) {
  return (
    <div className={styles.titleBox}>
      <h1 className={styles.titleText}>{title}</h1>
      <p className={styles.bodyText}>{text}</p>
      {children}
    </div>
  )
}

export default OyezTitleBox
