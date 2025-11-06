// Imports packages
const express = require('express') // common js - require('')
require('dotenv').config()
const morgan = require('morgan')

// Import config / routes
const config = require('./config/config')
const apiErrorHandler = require('./middleware/apiErrorHandler')
const ApiError = require('./utilities/ApiError')
const routes = require('./routes/routes')

// Custom debug logs
const startlog = require('debug')('app:startup')
const { dbPing } = require('./config/db')

// Instance of express
const app = express()

// ---------- MIDDLEWARE ----------
// Default middleware for parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Dev morgan output
app.use(morgan('dev'))

// Express endpoints
startlog('Accessing endpoints under /api ...')
app.use('/api', routes()) // all paths in routes now start with "/api"

// ERROR HANDLERS: 404 NOT FOUND
app.use((req, res, next) => {
  // const err = new Error('404 - Resource Not Found')
  // err.status = 404
  // res.status(err.status).send(err)
  next(ApiError.notFound())
})

// ERROR HANDLER: 400s & 500s ("everything else")
app.use(apiErrorHandler)

app.listen(
  config.port,
  () => console.log(`Server is running on port: ${config.port}`)
)

// dbPing.then(() => {
//   app.listen(
//     config.port,
//     () => console.log(`Server is running on port: ${config.port}`)
//   )
// })
