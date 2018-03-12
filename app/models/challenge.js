const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    _id: Joi.objectId(),
    description: Joi.string(),
    expirationDate: Joi.date(),
    points: Joi.number(),
    dogOwnerType: Joi.string().valid(['DogLover', 'DogOwner'])
    //createdate
    //updatedate
}

module.exports = Joi.object().keys(schema)