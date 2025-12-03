import { Container, } from 'react-bootstrap';
import OyezLink from '../components/common/OyezLink';
import OyezTitleBox from '../components/common/OyezTitleBox';
import * as styles from './Home.css'

const Home = () => {
  return (
    <Container className={styles.pageContainer}>
      <OyezTitleBox
        title='Welcome to Oyez Oyez'
        text='A medieval themed online store. Browse Oyez Oyez&apos;s collection of art, items and icons'
      >
        <OyezLink to="/store/products">Shop Now</OyezLink>
      </OyezTitleBox>
    </Container>
  )
}

export default Home
