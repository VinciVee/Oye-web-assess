// Import Libraries
const admin = require('firebase-admin')
const cloudinary = require('cloudinary').v2

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
  //db.settings({ preferRest: true })
  const bucket = admin.storage().bucket() //storage bucket used to store media files

  // CLOUDINARY CONFIGURATION
  cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
  });

  const cloudUploader = cloudinary.uploader;

  // "Ping test" Function (only use in development)
  const dbPing = db.listCollections()
  .then(collections => {
    dbStartup("Connected to Cloud Firestore")
    for (let collection of collections) {
      dbStartup(`Found db collection: ${collection.id}`)
    }
  })

  module.exports = { db, bucket, dbPing, cloudUploader }

} catch (err) {
  debugError500(err)
}
