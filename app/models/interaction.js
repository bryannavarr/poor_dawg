const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    _id: Joi.objectId().optional(),
    challengeId: Joi.objectId().required(),
    dogOwnerId: Joi.objectId().required(),
    dogId: Joi.objectId().required(),
    points: Joi.number().required(), 
    createDate: Joi.date().iso().default(() => new Date, 'time of creation'), 
    updateDate: Joi.date().iso().default(() => new Date, 'time of creation')


}

module.exports = Joi.object().keys(schema)