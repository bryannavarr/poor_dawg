const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)


const schema = {
    dogOwnerId: Joi.objectId().required(),
    _id: Joi.objectId(),
    dogId: Joi.objectId(),
    message: Joi.string(),
    type: Joi.string().valid(['Challenges', 'Wellness'])
}

module.exports = Joi.object().keys(schema)