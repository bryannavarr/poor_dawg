const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    // email: Joi.string().email(),
    role: Joi.any().valid(['Admin', 'DogOwner', 'DogLover', 'Sponsor']),
    password: Joi.string().length(6).required(),
    isEmailConfirmed: Joi.boolean().required(),
    _id: Joi.objectId(),
    createDate: Joi.date().iso().default(() => new Date(), 'time of creation'),
    updateDate: Joi.date().iso().default(() => new Date(), 'time of update')
}
module.exports = Joi.object().keys(schema)