import api from './api'

// REGISTER POST REQUEST
async function register(data){
  const response = await api.post('/api/auth/register', data, formConfig)
  console.log(response?.data)
  return response
}

// LOGIN POST REQUEST
async function login(data){
  const response = await api.post('/api/auth/login', data)
  console.log(response?.data)
  return response
}

// HELPER TOOLS / FUNCTIONS
const formConfig = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

const authService = {
  register,
  login
}

export default authService
