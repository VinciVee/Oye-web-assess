const ApiError = require('../utilities/ApiError')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

// TWO AUTHORISATION PIECES OF MIDDLEWARE (Express.js)
// Checks if user is logged in
const auth = (req, res, next) => {
  let token = req.header("Authorization")
  if(!token) {
    return next(ApiError.denyAccess("No token provided"))
  } else {
    // Token exists, but need to check if expired OR invalid
    token = token.substring(7, token.length)
    console.log(`DEBUG: Returned token of ${token}`)
  }

  // Test for valid token
  try {
    const decoded = jwt.verify(token, config.authentication.jwtSecret)
    req.user = decoded
    console.log(`User is verified: ${req.user.username}`)
    next()

  } catch (ex) { // ex for exceptions
    console.log(ex)
    return next(ApiError.denyAccess("Invalid token"))
  }
}

// Check if user is admin
// runs after 'auth'
const admin = (req, res, next) => {
  // req.user passed from 'auth'
  if(!req.user.isAdmin) {
    return next(ApiError.forbidden("Insufficient permissions"))
  }
  console.log(`Admin access granted to ${req.user.username}`)
  next()
}

const verifyAuth = {
  auth,
  admin
}

module.exports = verifyAuth
