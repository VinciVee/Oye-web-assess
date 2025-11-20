const { db } = require('../config/db')
const ApiError = require('../utilities/ApiError')

module.exports = {
  // LIST ALL PRODUCTS
  async getAllProducts(req, res, next){
    try {
      // Store doc query
      const productsRef = db.collection('products')
      const snapshot = await productsRef.get()

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
    } catch (err) {
      return next(ApiError.internal('The items selected could not be found', err))
    }
  },
}
