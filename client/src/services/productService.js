import api from './api'

// GET ALL Reqest
function getAll(){
  return api.get('/api/products')
}

const productService = {
  getAll,
}

export default productService
