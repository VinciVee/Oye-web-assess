import { useState } from 'react';
import ProductsList from "../../components/features/products/ProductsList"
import Container from "react-bootstrap/Container";

function ProductsPage() {
  // PRODUCTS STATE
  const [products, setProducts] = useState([
    { id: 1, name: "product1", image: "https://placehold.co/150x200/lightgrey/darkgrey?font=roboto&text=Product" },
    { id: 2, name: "product2", image: "https://placehold.co/150x200/lightgrey/darkgrey?font=roboto&text=Product" },
    { id: 3, name: "product3", image: "https://placehold.co/150x200/lightgrey/darkgrey?font=roboto&text=Product" },
    { id: 4, name: "product4", image: "https://placehold.co/150x200/lightgrey/darkgrey?font=roboto&text=Product" },
  ])

  // PRODUCTS FUNCTIONS
  function handleAddProduct(name){
    const newProduct = {
      id: crypto.randomUUID(),
      name: name,
      image: `https://placehold.co/100x100/pink/darkblue?font=montserrat&text=${name}!`
    }
    setProducts(currentProducts => {
      return [...currentProducts, newProduct]
    })
    console.log("Product added to cart!")
  }

  function handleRemoveProduct(id){
    console.log(id)
    const updatedProducts = products.filter(product => product.id !== id)
    setProducts(updatedProducts)
  }

  return (
    <Container>
      <ProductsList
        products={products}
        onAddProduct={handleAddProduct}
        onRemoveProduct={handleRemoveProduct}
      />
    </Container>
  )
}

export default ProductsPage
