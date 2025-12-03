const Joi = require('joi')
const ApiError = require('../utilities/ApiError')
const debugJoi = require('debug')('app:joi')

module.exports = {
  // Design the data schema = sets the rules
  validateAuth(req ,res, next){
    debugJoi(req.body)
    const schema = Joi.object({
      username: Joi.string().min(3).max(50).alphanum(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: {allow: ['com', 'net', 'au']}}).required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      image: Joi.any()
    });

    // Call the validate function to potentially return erros for bad data
    const { error, value } = schema.validate(req.body)

    // Check for error & what it is
    if(error){
      debugJoi(error)
      switch(error.details[0].context.key){
        case 'username':
          next(ApiError.badRequest(error.details[0].message))
          break

        case 'email':
          next(ApiError.badRequest('You must provide a valid email '))
          break

        case 'password':
          next(ApiError.badRequest('You must provide a valid password '))
          break

        case 'image':
          next(ApiError.badRequest('Invalid image URL. Please re-upload the image'))
          break

        default:
          next(ApiError.badRequest('Invalid form information - please check and submit again later ...'))
      }
    } else {
      // On success, pass to the next middleware
      next()
    }
  }
}
