// Imports packages
const express = require('express') // common js - require('')
require('dotenv').config()

// Import config / routes
const config = require('./config/config')
const apiErrorHandler = require('./middleware/apiErrorHandler')
const ApiError = require('./utilities/ApiError')
const routes = require('./routes/routes')

// Instance of express
const app = express()

// Default middleware for parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Express endpoints
app.use('/api', routes()) // all paths in routes now start with "/api"

// ERROR HANDLERS: 404 NOT FOUND
app.use((req, res) => {
  // const err = new Error('404 - Resource Not Found')
  // err.status = 404
  // res.status(err.status).send(err)
  next(ApiError.notFound())
})

// ERRPR HANDLER: 400s & 500s ("everything else")
app.use(apiErrorHandler)

app.listen(
  config.port,
  () => console.log(`Server is running on port: ${config.port}`)
)
