const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    breed: Joi.string().required(),
    birthDate: Joi.date().iso().required(),
    adoptionDate: Joi.date().iso().required(),
    deathDate: Joi.date().iso().required(),
    _id: Joi.objectId(),
    userId: Joi.objectId(),
    createDate: Joi.date().iso().default(() => new Date(), 'time of creation'),
    updateDate: Joi.date().iso().default(() => new Date(), 'time of creation')
}

module.exports = Joi.object().keys(schema)