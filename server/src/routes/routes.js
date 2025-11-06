const express = require('express')
// Router instance of app (express)
// Hook into app instance - add-on
const router = express.Router()

const authRoutes = require('./authRoutes')

// Endpoints for "/" path
module.exports = () => {
  // HOME/TEST Endpoint
  // '/' - route path for server
  router.get('/', (req, res, next) => { // part of express tool belt
    res.send("Welcome to Oye` Oye` 📣")
  })

  // AUTH ROUTES: /api/auth
  // When importing a route, it needs to be consumed as a function - Router requirement
  router.use('/auth', authRoutes())

  return router
}

