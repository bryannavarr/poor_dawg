const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {

    _id: Joi.objectId(),
    restrictions: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    pointsRequired: Joi.number().required(),
    sponsor: Joi.string().required(),
    type: Joi.string().valid(["Rewards", "Perks"]),
    createDate: Joi.date().iso().default(() => new Date, 'date of creation'),
    updateDate: Joi.date().iso().default(() => new Date, 'date of update')
       
    

}

module.exports = Joi.object().keys(schema)