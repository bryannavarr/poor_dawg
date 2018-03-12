const Joi = require('joi')
const Joi.objectId = require('joi-objectid')

const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    smsNumber: Joi.string(),
    phones: Joi.array(),
    address: {
        street: Joi.string(),
        suite: Joi.string(),
        city: Joi.string(),
        state: Joi.string().max(2),
        zip: Joi.string().max(10)
    },
    _id: Joi.objectId()
}

module.exports = Joi.object().keys(schema)
