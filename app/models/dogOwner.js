const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    _id: Joi.objectId(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    zipCode: Joi.number().integer(),
    email: Joi.string().email(),
    phone: Joi.number(),
    dogs: Joi.string(),
    subscriptionLevel: Joi.string().valid(['Premium','Free']),
    createDate:Joi.date().iso().default(()=>new Date(),'time of creation'),
    updateDate:Joi.date().iso().default(()=>new Date(),'time of creation')
}

module.exports=Joi.object().keys(schema)