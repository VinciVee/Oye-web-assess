import { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import OyezBox from '../components/common/OyezBox';
import * as styles from './Home.css'

const Home = () => {
  return (
    <Fragment>
      <Container>
        <Row className="mb-3">
          <Col xs={8} className='pt-3 ps-5'>
            <OyezBox
              title="A Gothic Themed Store"
              text="A medieval themed online store"
              buttonPath="/store/products"
              buttonText="Login"
            />
          </Col>
          <Col xs={4}>
            <img
              src="/src/assets/images/hannah-wright-castle_unsplash.webp"
              alt='a castle'
              className={styles.imageBox}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={4}>
            <img
              src="/src/assets/images/ani-adigyozalyan-hill_unsplash_cropped.webp"
              alt='a hill'
              className={styles.imageBox}
            />
          </Col>
          <Col xs={8} className='pt-3 ps-5'>
            <OyezBox
              title="Shop online"
              text="Browse Oyez Oyez&apos;s collection of art, items and icons"
              buttonPath="/login"
              buttonText="Shop Now"
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default Home
