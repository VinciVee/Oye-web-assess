const express = require('express')
// Router instance of app (express)
// Hook into app instance - add-on
const router = express.Router()

const AuthController = require('../controllers/authController')

module.exports = () => {
  // AUTH TEST ROUTE: Lists all users (GET): /api/auth/users
  router.get('/users', AuthController.listUsers)
  // Only referencing listUsers - insteading of using listUsers()

  // AUTH: Register / Sign up (POST): /api/auth/register
  router.post('/register', AuthController.register)


  // AUTH: Login / Sign in


  return router
}
