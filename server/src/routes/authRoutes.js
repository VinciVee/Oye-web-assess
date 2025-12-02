const express = require('express')
// Router instance of app (express) - hook into app instance - add-on
const router = express.Router()

const FilePolicy = require("../policies/filePolicy")
const AuthPolicy = require('../policies/authPolicy')
const fileServerUpload = require('../middleware/fileServerUpload')
const AuthController = require('../controllers/authController')

module.exports = () => {
  // AUTH TEST ROUTE: Lists all users (GET): /api/auth/users
  router.get('/users',
    AuthController.listUsers
  )

  // AUTH: Login / Sign in (POST) Route: /api/auth/log
  router.post('/login',
    AuthPolicy.validateAuth,
    AuthController.login
  )

  // AUTH: Register / Sign up (POST): /api/auth/register
  router.post('/register',
    [AuthPolicy.validateAuth,
    FilePolicy.filesPayloadExists,
    FilePolicy.fileSizeLimiter,
    FilePolicy.fileExtLimiter(['.png','.jpg','.gif','.webp','.jpeg']),
    fileServerUpload],
    AuthController.register
  )

  return router
}
