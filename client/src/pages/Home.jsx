import { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import OyeBox from '../components/common/OyeBox';

const Home = () => {
  return (
    <Fragment>
      <Container>
        <OyeBox
          title="A Gothic Themed Store"
          text="Browse Oye Oye&apos;s collection of medieval themed digital cards, backgrounds and icons"
          shopPath="/store/products"
        >
        </OyeBox>
      </Container>
    </Fragment>
  )
}

export default Home
