const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    challengeId: Joi.objectId(),
    dogOwnerId: Joi.objectId(),
    dogId: Joi.objectId(),
    points: Joi.number(), 
    createDate: Joi.date().iso().default(() => new Date, 'time of creation'), 
    updateDate: Joi.date().iso().default(() => new Date, 'time of creation')


}

module.exports = Joi.object().keys(schema)