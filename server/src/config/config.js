module.exports = {
  port: process.env.PORT,
  db: {
    serviceAccountKey: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    storageBucket: process.env.STORAGE_BUCKET_URL
  }
}
