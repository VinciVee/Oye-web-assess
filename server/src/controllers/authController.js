const { db } = require('../config/db')
const ApiError = require('../utilities/ApiError')
const { findUser, hashPassword, userDetailsToJSON, jwtSignUser, comparePassword } = require('../utilities/authServices')

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
      const userMatch = await findUser(email)

      if(userMatch.length > 0){
        return next(ApiError.badRequest('This email already exists'))
      }

      // Save the new user to the db
      const usersRef = db.collection('users')
      const response = await usersRef.add({
        username: username,
        email: email,
        password: await hashPassword(password),
        isAdmin: false
      })
      // response from Firestore has an id
      console.log(`User: ${response.id} registered!`)

      // To automatically log in the user once registered--------------
      const userJSON = await userDetailsToJSON(response.id)

      // Response: Send back a token on SUCCESS------------------
      res.send({
        token: jwtSignUser(userJSON) // Minting the token
      })

    } catch(err) {
      return next(ApiError.internal('Your profile could not be registered at this time ...',err))
    }
  },

  // LOGIN USERS
  async login(req, res, next){
    // Save form data to local vars
    const { email, password } = req.body

    // Check user is saved to the db already [AUTH-1]
    const userMatch = await findUser(email)
    if(!userMatch.length){ // [] true / "" false
      return next(ApiError.badRequest('Incorrect email or password (DEBUG - email)'))
    }

    // Check that password matches the db user pwd [AUTH-2]
    const passwordMatch = await comparePassword(userMatch[0].password, password)

    if(!passwordMatch){
      return next(ApiError.badRequest('Incorrect email or password (DEBUG - pwd)'))
    }

    // Response & minting the token
    console.log(`Success - user logged in: ${userMatch[0].id}`)

    // Structure the data payload to be saved within the token
    const userJSON = await userDetailsToJSON(userMatch[0].id)

    // Response: Send back a token on SUCCESS------------------
    res.send({
      token: jwtSignUser(userJSON) // Minting the token
    })
  }
}
