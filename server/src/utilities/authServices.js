const { db } = require('../config/db')
const config = require('../config/config')

const bcrypt = require('bcrypt')
const _ = require('lodash')
const jwt = require('jsonwebtoken')



module.exports = {
  // Find duplicate user
  async findUser(userEmail){
    const usersRef = db.collection('users')
    const snapshot = await usersRef.get()

    // Structure the snapshot so it returns valid array of docs
    let users = []
    snapshot.forEach(doc => {
      users.push({
        id: doc.id,
        username: doc.data().username,
        email: doc.data().email,
        password: doc.data().password,
        isAdmin: doc.data().isAdmin
      })
    })

    // Check for match: either [] or [{ id: 1, etc. }]
    const userMatch = users.filter((user) => (user.email === userEmail))
    return userMatch
  },

  // Hash password
  async hashPassword(password){
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    return hashPassword
  },


  // Generate the payload for the token
  async userDetailsToJSON(id){
  // Structure the data payload to be saved within the token
    const usersRef = db.collection('users')
    const user = await usersRef.doc(id).get()
    const userJSON = _.omit(
      { id: id, ...user.data() },
      'password'
    )
    console.log(userJSON)
    return userJSON
  },

  // Mint the token
  jwtSignUser(user){
    const payload = user
    const secret = config.authentication.jwtSecret
    const tokenExpireTime = 60 * 60 * 24 // Time To Live (TTL) - 24 hrs in seconds

    const token = jwt.sign(
      payload,
      secret,
      { expiresIn: tokenExpireTime }
    )

    return token
  },
}
