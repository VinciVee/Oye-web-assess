import * as styles from './OyezForm.css'

/**
 * Form component to frame forms (login, register, edit and add products forms)
 *
 * @param {*} param0
 * @returns
 */
const OyezForm = ({ title, authform, children }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.leadCard} ${authform ? styles.authForm : styles.generalForm}`}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <div className={styles.cardBody}>{children}</div>
      </div>
    </div>
  )
}

export default OyezForm
