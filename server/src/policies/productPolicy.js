const Joi = require('joi');
const ApiError = require('../utilities/ApiError');
const debugJoi = require('debug')('app:joi');

module.exports = {
  // Validate POST products
  validateProduct(req, res, next){
    debugJoi(req.body);
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      description: Joi.string().min(3).max(2000).required(),
      image: Joi.any().required(),
      price: Joi.number().required(),
      category: Joi.string().required(),
      isAvailable: Joi.boolean().required(),
      onSale: Joi.boolean().required(),
      oldImageId: Joi.string()
    });

    const { error, value } = schema.validate(req.body);

    // IF VALIDATION ERROR
    if ( error ) {
      debugJoi(error);
      switch(error.details[0].context.key){
        case 'name':
          next(ApiError.badRequest('A valid product name is required'))
          break

        case 'description':
        case 'category':
          next(ApiError.badRequest('Valid product information including description, and category is required'))
          break

        case 'price':
          next(ApiError.badRequest('Valid pricing is required for the product'))
          break

        case 'onSale':
        case 'isAvailable':
          next(ApiError.badRequest('Check if product is on sale and/or in stock'))
          break

        case 'image':
          next(ApiError.badRequest('Invalid image URL. Please re-upload the image'))
          break

        default:
          next(ApiError.badRequest('Invalid Form Information - please check form information and resubmit'))
      }

    } else {
      // On success, pass to the next middleware
      next();
    }
  }
}
