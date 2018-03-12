const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    challengeId: Joi.objectId(),
    dogOwnerId: Joi.objectId(),
    dogId: Joi.objectId(),
    points: Joi.number(), 
    createDate: Joi.date().default(Date.now, 'time of creation'), 
    updateDate: Joi.date().optional()

}

module.exports = Joi.object().keys(schema)