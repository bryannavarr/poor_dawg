const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
//const createDate = Joi.date().min('now')


const schema = {
    dogOwnerId: Joi.objectId().required(),
    _id: Joi.objectId(),
    dogId: Joi.objectId().required(),
    message: Joi.string(),
    type: Joi.string().valid(['Challenges', 'Wellness']),
    createDate: Joi.date().default(Date.now, 'date of creation'),
    updateDate: Joi.date().default(Date.now, 'date of update')
}

module.exports = Joi.object().keys(schema)