const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)


const schema = {
    dogOwnerId: Joi.objectId().required(),
    _id: Joi.objectId(),
    dogId: Joi.objectId().required(),
    message: Joi.string(),
    type: Joi.string().valid(['Challenges', 'Wellness']),
    createDate: Joi.date().iso().default(() => new Date, 'date of creation'),
    updateDate: Joi.date().iso().default(() => new Date, 'date of update')
}

module.exports = Joi.object().keys(schema)