const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)

const schema = {
    _id: Joi.objectId(),
    companyName: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    zipCode: Joi.number(),
    email: Joi.string().email().required(),
    phone: Joi.number().required()
}

module.exports = Joi.object().keys(schema)