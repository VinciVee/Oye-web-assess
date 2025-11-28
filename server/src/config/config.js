module.exports = {
  port: process.env.PORT,
  db: {
    serviceAccountKey: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    storageBucket: process.env.STORAGE_BUCKET_URL
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET
  },
  // Approved CORS whitelist
  corsAllowedOptions: [
    process.env.CORS_WHITELIST_1,
    process.env.CORS_WHITELIST_2,
    process.env.CORS_WHITELIST_3,
  ],
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  }
}
