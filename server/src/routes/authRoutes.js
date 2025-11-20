const express = require('express')
// Router instance of app (express) - hook into app instance - add-on
const router = express.Router()

const AuthController = require('../controllers/authController')
const AuthPolicy = require('../policies/authPolicy')

module.exports = () => {
  // AUTH TEST ROUTE: Lists all users (GET): /api/auth/users
  router.get('/users', AuthController.listUsers)
  // Only referencing listUsers - insteading of using listUsers()

  // AUTH: Register / Sign up (POST): /api/auth/register
  router.post('/register',
    AuthPolicy.validateAuth,
    AuthController.register)


  // AUTH: Login / Sign in (POST) Route: /api/auth/log
  router.post('/login',
    AuthPolicy.validateAuth,
    AuthController.login)

  return router
}
