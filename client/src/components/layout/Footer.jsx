import * as styles from './Footer.css'

function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className={styles.footer}>
      <span>&copy; {getCurrentYear()} Timbertop United</span>
    </footer>
  )
}

export default Footer
