const express = require('express')
// Router instance of app (express) - hook into app instance - add-on
const router = express.Router()

const ProductController = require('../controllers/productController')
const fileServerUpload = require('../middleware/fileServerUpload')
const ProductPolicy = require('../policies/productPolicy')
const FilePolicy = require("../policies/filePolicy")


module.exports = () => {
  // PRODUCTS: Get all products (GET): /api/products
  router.get('/', ProductController.getAllProducts)

  // GET: onSale Products
  router.get('/onsale',
    ProductController.getOnSaleProducts
  );

  // PRODUCTS: Get one product (GET): /api/products/:id
  router.get('/:id', ProductController.getProductById)

  // PRODUCTS: Add a product (GET): /api/products/
  router.post('/',
    [ProductPolicy.validateProduct,
    FilePolicy.filesPayloadExists,
    FilePolicy.fileSizeLimiter,
    FilePolicy.fileExtLimiter(['.png','.jpg','.gif','.webp','.jpeg']),
    fileServerUpload],
    ProductController.addProduct
  )

  // PRODUCTS: Delete a product (DELETE): /api/products/:id
  router.delete('/:id',
    [],
    ProductController.deleteProduct)

  // PRODUCTS: Update a product (UPDATE): /api/products/:id
  router.put('/:id',
    [ProductPolicy.validateProduct,
    FilePolicy.filesPayloadExists,
    FilePolicy.fileSizeLimiter,
    FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg', '.gif']),
    fileServerUpload],
    ProductController.updateProduct,
  )

  return router
}
