const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    // name: Joi.string().required(),
    _id: Joi.objectId(),
    description: Joi.string(),
    expirationDate: Joi.date(),
    points: Joi.number(),
    dogOwnerType: Joi.string().valid(['DogLover', 'DogOwner'])
    // dogOwnerType: Joi.array().items(Joi.string().valid(), Joi.string().valid())
    //createdate
    //updatedate
}

module.exports = Joi.object().keys(schema)