const express = require('express')
// Router instance of app (express) - hook into app instance - add-on
const router = express.Router()

const FilePolicy = require("../policies/filePolicy")
const VerifyAuth = require('../middleware/verifyAuth')
const fileServerUpload = require('../middleware/fileServerUpload')
const ProductPolicy = require('../policies/productPolicy')
const ProductController = require('../controllers/productController')


module.exports = () => {
  // [GET] ALL PRODUCTS: /api/products
  router.get('/', ProductController.getAllProducts)

  // [GET] ON SALE PRODUCTS: /api/products/sales
  router.get('/sales', ProductController.getOnSaleProducts)

  // [GET] PRODUCT BY ID: /api/products/:id
  router.get('/:id', ProductController.getProductById)

  // [POST] add A PRODUCT: /api/products/
  router.post('/',
    [ProductPolicy.validateProduct,
    FilePolicy.filesPayloadExists,
    FilePolicy.fileSizeLimiter,
    FilePolicy.fileExtLimiter(['.png','.jpg','.gif','.webp','.jpeg']),
    VerifyAuth.auth,
    fileServerUpload
    ],
    ProductController.addProduct
  )

  // [DELETE] A PRODUCT: /api/products/:id
  router.delete('/:id',
    [VerifyAuth.auth,
      VerifyAuth.admin],
    ProductController.deleteProduct
  )

  // [PUT] update A PRODUCT: /api/products/:id
  router.put('/:id',
    [ProductPolicy.validateProduct,
    FilePolicy.filesPayloadExists,
    FilePolicy.fileSizeLimiter,
    FilePolicy.fileExtLimiter(['.png','.jpg','.gif','.webp','.jpeg']),
    VerifyAuth.auth,
    fileServerUpload],
    ProductController.updateProduct,
  )

  return router
}
