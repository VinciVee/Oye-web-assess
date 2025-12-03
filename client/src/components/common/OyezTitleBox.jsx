import * as styles from './OyezTitleBox.css'

function OyezTitleBox({title, text, children}) {
  return (
    <div className={styles.titleBox}>
      <h1 className={styles.titleText}>{title}</h1>
      <h2 className={styles.bodyText}>{text}</h2>
      {children}
    </div>
  )
}

export default OyezTitleBox
