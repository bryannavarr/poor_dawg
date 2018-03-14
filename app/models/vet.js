const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    smsNumber: Joi.string(),
    address: {
        street: Joi.string(),
        suite: Joi.string(),
        city: Joi.string(),
        state: Joi.string().min(2).max(2),
        zip: Joi.string().max(10)
    },
    createDate: Joi.date().iso().default(() => new Date(), 'Current Date'),
    updateDate: Joi.date().iso().default(() => new Date(), 'Current Date'),
    _id: Joi.objectId()
}

module.exports = Joi.object().keys(schema)
