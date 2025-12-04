const { db } = require('../config/db')
const ApiError = require('../utilities/ApiError')
const { cloudinaryImageUpload, cloudinaryDeleteImage, getFileIdFromUrl } = require('../lib/cloudinaryImageUploadService')

const debugREAD = require('debug')('app:read');
const debugWRITE = require('debug')('app:write');

module.exports = {
  // LIST ALL PRODUCTS
  async getAllProducts(req, res, next){
    try {
      // Store doc query
      const productsRef = db.collection('products')

      // SORT & LIMIT QUERY
      const snapshot = await productsRef.orderBy("name","asc").limit(20).get()

      // SORT KEY QUERY #3 (compound)
      // const snapshot = await productsRef.where("category","==","painting").orderBy("name","desc").get()

      // SORT KEY QUERY #2 (where)
      // const snapshot = await productsRef.where("onSale","==",true).get()

      // SORT KEY QUERY #1 (order)
      // const snapshot = await productsRef.orderBy("name","asc").get()

      // [400 ERROR] Check for no documents
      if(snapshot.empty){
        return next(ApiError.badRequest('The documents you were looking for do not exist'))
      } else {
        // Structure the snapshot so it returns valid array of docs
        let products = []
        snapshot.forEach(doc => {
          products.push({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            image: doc.data().image,
            price: doc.data().price,
            category: doc.data().category,
            isAvailable: doc.data().isAvailable,
            onSale: doc.data().onSale
          })
        })
        res.send(products)
      }
    } catch (error) {
      return next(ApiError.internal('The items selected could not be found', error))
    }
  },


  // GET ONSALE PRODUCTS
  async getOnSaleProducts(req, res, next){
    try {
      const productRef = db.collection('products');
      // Search query
      const snapshot = await productRef.where("onSale", "==", true).orderBy("name", "asc").limit(20).get()

      // [400 ERROR] Check for User Asking for Non-Existent Documents
      if (snapshot.empty) {
        return next(ApiError.badRequest('Item(s) could not be retrieved'));

      // Sending on sale products
      } else {
        let docs = [];
        snapshot.forEach(doc => {
          docs.push({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            image: doc.data().image,
            price: doc.data().price,
            category: doc.data().category,
            isAvailable: doc.data().isAvailable,
            onSale: doc.data().onSale,
          })
        })
        res.send(docs)
      }
    } catch(error) {
      return next(ApiError.internal('The item(s) selected could not be found', error));
    }
  },

  // GET A PRODUCT BY ID
  async getProductById(req, res, next){
    debugREAD(req.params);

    try {
      const productRef = db.collection('products').doc(req.params.id);
      const doc = await productRef.get();

      // If product was found/exist -> send to client
      if (!doc.exists) {
        return next(ApiError.badRequest('The item you were looking for does not exist'));
      } else {
        res.send(doc.data());
      }
    } catch(err) {
      return next(ApiError.internal('Your request could not be processed at this time', err));
    }
  },

  // ADD PRODUCT
  async addProduct(req, res, next){
    debugWRITE(req.body);
    debugWRITE(req.files);
    debugWRITE(res.locals);

    let downloadUrl;
    try {
      if(req.files) {
        const filename = res.locals.filename;

        // CLOUDINARY IMAGE UPLOAD SERVICE
        const uploadResult = await cloudinaryImageUpload(filename);
        downloadUrl = uploadResult.data.secure_url;

      } else {
        debugWRITE(`No change to image in DB`);
        downloadUrl = req.body.image;
      }
    } catch(error) {
      return next(ApiError.internal('An error occurred uploading the image to storage', error));
    }

    try {
      const productsRef = db.collection('products')
      const response = await productsRef.add({
        name: req.body.name,
        description: req.body.description,
        image: downloadUrl,
        price: Number(req.body.price),
        category: req.body.category,
        isAvailable: req.body.isAvailable,
        onSale: req.body.onSale,
      });
      console.log(`Added Product ID: ${response.id}`);
      res.send(response.id);

    // [500 ERROR] Checks for Errors in our Query - issue with route or DB query
    } catch(err) {
      return next(ApiError.internal('Item(s) could not be saved.', err));
    }
  },


  // UPDATE PRODUCT
  async updateProduct(req, res, next){
    // (a) Validation (JOI) Direct from Form (refactored)
    debugWRITE(req.params);
    debugWRITE(req.body);
    debugWRITE(req.files);
    debugWRITE(res.locals);

    let downloadUrl;

    try {
      if (req.files){
        const filename = res.locals.filename;

        // CLOUDINARY IMAGE UPLOAD SERVICE
        const uploadResult = await cloudinaryImageUpload(filename)
        downloadUrl = uploadResult.data.secure_url

        // Delete old image
        if (req.body.oldImageId) {
          debugWRITE(`Deleting old image in storage: ${req.body.oldImageId}`)
          const oldImagePublicId = getFileIdFromUrl(req.body.oldImageId)
          const deleteResult = await cloudinaryDeleteImage(oldImagePublicId)
          debugWRITE(deleteResult)
        }
      } else {
        console.log(`DB image unchanged`)
        downloadUrl = req.body.image;
      }
    } catch(error) {
      return next(ApiError.internal('An error occurred in saving the image to storage', error));
    }
    try {
      const productRef = db.collection('products').doc(req.params.id);
      const response = await productRef.update({
        name: req.body.name,
        description: req.body.description,
        image: downloadUrl,
        price: Number(req.body.price),
        category: req.body.category,
        isAvailable: req.body.isAvailable,
        onSale: req.body.onSale,
      });
      res.send(response);

    } catch(error) {
      return next(ApiError.internal('Error updating item(s)', error));
    }
  },


  // DELETE PRODUCT
  async deleteProduct(req, res, next) {
    debugREAD(req.params);

    try {
      // Getting Cloudinary image url
      const productRef = db.collection('products').doc(req.params.id)
      const doc = await productRef.get()
      if (!doc.exists) {
        return next(ApiError.notFound("Item not found"))
      }

      const imageUrl = doc.data().image

      // Delete image in cloudinary
      // Get image's public id
      imagePublicId = getFileIdFromUrl(imageUrl)
      debugWRITE(`Deleting image in storage: ${imagePublicId}`)
      const deleteResult = await cloudinaryDeleteImage(imagePublicId)

      // Delete product from Firestore
      if(deleteResult.success) {
        const response = await productRef.delete({ exists: true }) // precondition: double-check to prevent a hard error
        res.send({ message: "Product deleted successfully" })
      }

    } catch (error) {
      return next(
        ApiError.internal("Item(s) could not be deleted", error)
      )
    }
  }
}
