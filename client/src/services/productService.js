import api from './api'

// GET ALL PRODUCTS
async function getAll() {
  const response = await api.get('/api/products')
  console.log('[productService] getAll request response: ', response?.data)
  return response
}

// GET ON SALE PRODUCTS
async function getOnSale() {
  const response = await api.get('/api/products/sales')
  return response
}

// GET PRODUCT BY ID
async function getProductById(id) {
  const response = await api.get(`/api/products/${id}`)
  return response
}

// ADD PRODUCT
function addProduct(data) {
  const formData = prepareFormData(data)
  return api.post(
    '/api/products', formData, formConfig
  )
}

// UPDATE PRODUCT
function updateProduct(id, data, oldImageId) {
  const formData = prepareFormData(data, oldImageId)
  return api.put(
    `/api/products/${id}`, formData, formConfig
  )
}

// DELETE PRODUCT
function deleteProduct(id, oldImageId) {
  return api.delete(`/api/products/${id}`, oldImageId)
}

// HELPER TOOLS / FUNCTIONS
const formConfig = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

function prepareFormData(data, oldImageId){
  // New instance of class
  let formData = new FormData();

  // Append reconfigured mixed data to new object
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('image', data.image);
  formData.append('price', data.price);
  formData.append('category', data.category);
  formData.append('isAvailable', data.isAvailable);
  formData.append('onSale', data.onSale);
  if (oldImageId) {
    formData.append('oldImageId', oldImageId);
  }

  // Return restructured form data (for our API)
  console.log('[productService] sending formData: ', formData)
  return formData;
}



const productService = {
  getAll,
  getOnSale,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
}

export default productService
