import api from './api'

// GET ALL PRODUCTS
async function getAll() {
  const response = await api.get('/api/products')
  console.log('[productService] getAll request response: ', response?.data)
  return response
}

// GET PRODUCT BY ID
// GET /api/products/:id


// ADD PRODUCT
async function addProduct(data) {
  const formData = prepareFormData(data)
  const response = await api.post('/api/products', formData, formConfig)
  return response
}

// UPDATE PRODUCT
// PUT /api/products/:id


// DELETE PRODUCT
// DELETE /api/products/:id


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
  addProduct
}

export default productService
