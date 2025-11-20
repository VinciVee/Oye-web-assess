const express = require('express')
// Router instance of app (express) - hook into app instance - add-on
const router = express.Router()

const ProductController = require('../controllers/productController')

module.exports = () => {
  // PRODUCTS: Get all products (GET): /api/products
  router.get('/', ProductController.getAllProducts)

  // PRODUCTS: Get one product (GET): /api/products/:id

  // PRODUCTS: Get one product (GET): /api/products/:id

  // PRODUCTS: Delete a product (DELETE): /api/products/:id

  // PRODUCTS: Update a product (UPDATE): /api/products/:id

  return router
}
