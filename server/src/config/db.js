// Import Libraries
const admin = require('firebase-admin')
const config = require('./config')

const dbStartup = require('debug')('app:db')
const debugError500 = require('debug')('app:error500')


try {
  dbStartup('Attempting db connnection ...')
  let serviceAccountKey = config.db.serviceAccountKey
  const firebaseAppOptions = {
    credential: admin.credential.cert(serviceAccountKey),
    storageBucket: config.db.storageBucket
  }

  // Call the database with OUR options
  admin.initializeApp(firebaseAppOptions)
  const db = admin.firestore()
  const bucket = admin.storage().bucket() //storage bucket used to store media files

  // "Ping test" Function (only use in development)
  const dbPing = db.listCollections()
  .then(collections => {
    dbStartup("Connected to Cloud Firestore")
    for (let collection of collections) {
      dbStartup(`Found db collection: ${collection.id}`)
    }
  })

  module.exports = { db, bucket, dbPing }

} catch (err) {
  debugError500(err)
}
