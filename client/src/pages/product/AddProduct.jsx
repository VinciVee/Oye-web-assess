import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, InputGroup, Row, Col, Spinner } from "react-bootstrap"

import productService from "../../services/productService"
import OyezCard from "../../components/common/OyezCard"
import OyezButton from "../../components/common/OyezButton"

function AddProduct() {
  // HOOK: SETTING COMPONENT STATE (& init values)
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
    category: "",
    isAvailable: true,
    onSale: false,
  });
  const [loading, setLoading] = useState(false);

  // Destructure productData
  const { name, description, image, price, category, isAvailable, onSale } = productData;

  // FORM FUNCTIONS
  // Sets form states before onClick event
  // event: user typing in form fields
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  }

  // Handles change in image field
  // event: user uploads an image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('image file: ', file)
    setProductData({ ...productData, image: file });
  }

  // Submits form data to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('[AddProduct] sending productData: ', productData)
      const response = await productService.addProduct(productData);
      console.log('[AddProduct] addProduct response: ', response);
      navigate('/store/products');

    } catch (err) {
      // scrolls to top of page
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
      setTimeout(() => {setLoading(false)}, 1000);
    }
  };

  return (
    <OyezCard title="Add Product">
      <Form onSubmit={ handleSubmit }>
        {/* GROUP 1: NAME */}
        <Form.Group className="mb-3">
          <Form.Label>Product name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="name"
            value={name}
            onChange={ handleTextChange }
          />
        </Form.Group>

        {/* GROUP 2: DESCRIPTION */}
        <Form.Group className="mb-3">
          <Form.Label>Product description</Form.Label>
          <Form.Control
            type="text"
            as='textarea'
            placeholder="Enter product description"
            name="description"
            value={description}
            onChange={ handleTextChange }
          />
        </Form.Group>

        {/* GROUP 3: CATEGORY */}
        <Form.Group className="mb-3">
          <Form.Label>Product category</Form.Label>
          <Form.Control
            as='select'
            name='category'
            value={category}
            onChange={ handleTextChange }
          >
            <option>Select category</option>
            <option value="paintings">Paintings</option>
            <option value="textiles">Textiles</option>
            <option value="sprites">Sprites</option>
          </Form.Control>
        </Form.Group>

        {/* GROUP 4: PRODUCT DETAILS */}
        <Form.Group className="mb-3">
          <Row>
            {/* 4A: PRICE */}
            <Col lg={4} md={4} sm={12}>
              <Form.Label>Product price</Form.Label>
              <InputGroup>
                <InputGroup.Text id="price-dollar">$</InputGroup.Text>
                <Form.Control
                  type="number"
                  aria-describedby="price-dollar"
                  id="price-input"
                  name="price"
                  placeholder="0"
                  value={price}
                  onChange={ handleTextChange }
                />
              </InputGroup>
            </Col>

            {/* 4B: ON SALE */}
            <Col lg={4} md={4} sm={12}>
              <Form.Label>Product sale status</Form.Label>
              <Form.Control
                as='select'
                name='onSale'
                value={onSale}
                onChange={ handleTextChange }
              >
                <option value={false}>Standard</option>
                <option value={true}>On Sale</option>
              </Form.Control>
            </Col>

            {/* 4C : IS AVAILABLE */}
            <Col lg={4} md={4} sm={12}>
              <Form.Label>Product availability</Form.Label>
              <Form.Control
                as='select'
                name='isAvailable'
                value={isAvailable}
                onChange={ handleTextChange }
              >
                <option value={true}>In Stock</option>
                <option value={false}>Out of Stock</option>
              </Form.Control>
            </Col>

          {/* END OF PRODUCT DETAILS ROW */}
          </Row>
        </Form.Group>

        {/* GROUP 5: PRODUCT IMAGE */}
        <Form.Group className="mb-3" controlId="image">
          <Row>

            {/* 5A: PRODUCT IMAGE */}
            <Col lg={12} md={12} sm={12}>
              <Form.Label>Product image</Form.Label>
              <Form.Control
                type="file"
                className="mb-4"
                onChange={ handleFileChange }
              />
            </Col>
          </Row>
        </Form.Group>

        {/* SUBMIT BUTTON */}
        <OyezButton loadingState={loading}>
          {loading ? <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          /> : 'Submit'}
        </OyezButton>
      </Form>
    </OyezCard>
  )
}

export default AddProduct
