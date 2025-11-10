const { db } = require('../config/db')
const ApiError = require('../utilities/ApiError')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

module.exports = {
  // LIST ALL USERS
  async listUsers(req, res, next){
    // Store doc query
    const usersRef = db.collection('users')
    const snapshot = await usersRef.get()


    // [400 ERROR] Check for no documents
    if(snapshot.empty){
      return next(ApiError.badRequest('No users exist for this collection'))
    }

    // Structure the snapshot so it returns valid array of docs
    let users = []
    snapshot.forEach(doc => {
      users.push({
        id: doc.id,
        username: doc.data().username,
        email: doc.data().email,
        isAdmin: doc.data().isAdmin
      })
    })
    res.send(users)
  },

  // REGISTER USERS
  async register(req, res, next){
    try {
      // Assign the credentials POST data to local variables
      console.log(req.body)
      const { username, email, password } = req.body

      // Validate user data: Block duplicate emails------------
      const usersRef = db.collection('users')
      const snapshot = await usersRef.get()

      // Structure the snapshot so it returns valid array of docs
      let users = []
      snapshot.forEach(doc => {
        users.push({
          id: doc.id,
          username: doc.data().username,
          email: doc.data().email,
          isAdmin: doc.data().isAdmin
        })
      })

      // Check for match: either [] or [{ id: 1, etc. }]
      const userMatch = users.filter((user) => (user.email === email))
      if(userMatch.length > 0){
        return next(ApiError.badRequest('This email already exists'))
      }

      // Hash & salt the password------------------------------
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)

      // Save the new user to the db
      const response = await usersRef.add({
        username: username,
        email: email,
        password: hashPassword,
        isAdmin: false
      })
      console.log(`User: ${response.id} registered!`)

      // Structure the data payload to be saved within the token


      // Response: Send back a token on SUCCESS------------------

      res.send("register route connected 🥳")

    } catch(err) {
      return next(ApiError.internal('Your profile could not be registered at this time ...',err))
    }
  },

  // LOGIN USERS
}
