const { db } = require('../config/db')
const ApiError = require('../utilities/ApiError')

module.exports = {
  // LIST USERS
  async listUsers(req, res, next){
    // Store doc query
    const usersRef = db.collection('users')
    const snapshot = await usersRef.get()


    // [440 ERROR] Check for no documents
    if(snapshot.empty){
      return next(ApiError.badRequest('No users exist for this collection'))
    }

    res.send(snapshot)
  },

  // REGISTER USERS

  // LOGIN USERS
}
