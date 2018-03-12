const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    _id: Joi.string().required(),
    role: Joi.any().valid(['Admin', 'DogOwner', 'DogLover', 'Sponsor']).required(),
    password: Joi.objectId().required(),
    isEmailConfirmed: Joi.boolean().valid(true).required(),
    userId: Joi.objectId().required()

}
module.exports = Joi.object().keys(schema)