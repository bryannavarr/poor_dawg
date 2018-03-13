const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
//const createDate = Joi.date().min('now')


const schema = {
    dogOwnerId: Joi.objectId().require(),
    _id: Joi.objectId(),
    dogId: Joi.objectId().require(),
    message: Joi.string(),
    type: Joi.string().valid(['Challenges', 'Wellness']),
    createDate: Joi.date().iso().default(() => new Date, 'date of creation'),
    updateDate: Joi.date().iso().default(() => new Date, 'date of update')
}

module.exports = Joi.object().keys(schema)