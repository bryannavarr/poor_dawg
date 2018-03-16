const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schema = {
  name: Joi.string().required(),
  _id: Joi.objectId(),
  individualNeeds: Joi.string(),
  activityLevel: Joi.string(),
  createDate: Joi.date()
    .iso()
    .default(() => new Date(), "time of creation"),
  updateDate: Joi.date()
    .iso()
    .default(() => new Date(), "time of creation")
};

module.exports = Joi.object().keys(schema);
