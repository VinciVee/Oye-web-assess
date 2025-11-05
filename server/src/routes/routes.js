const express = require('express')
// Router instance of app (express)
// Hook into app instance - add-on
const router = express.Router()

// Endpoints for "/" path
module.exports = () => {
  // HOME/TEST Endpoint
  // '/' - route path for server
  router.get('/', (req, res, next) => { // part of express tool belt
    res.send("Welcome to Oye` Oye` 📣")
  })

  return router
}

