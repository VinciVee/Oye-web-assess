import { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import TuBox from '../components/common/TuBox';

const Home = () => {
  return (
    <Fragment>
      <Container>
        <TuBox
          title="A Gothic Themed Store"
          text="Browse Oye Oye&apos;s collection of medieval themed digital cards, backgrounds and icons"
          shopPath="/store/products"
        >
        </TuBox>
      </Container>
    </Fragment>
  )
}

export default Home
