import { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import OyezBox from '../components/common/OyezBox';

const Home = () => {
  return (
    <Fragment>
      <Container>
        <OyezBox
          title="A Gothic Themed Store"
          text="Browse Oyez Oyez&apos;s collection of medieval themed digital cards, backgrounds and icons"
          shopPath="/store/products"
        >
        </OyezBox>
      </Container>
    </Fragment>
  )
}

export default Home
